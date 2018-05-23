'use strict';
/**
 * This file parses incoming XML save file
 * This will turn incoming XML file into JS object we're going to use in the planner
 *
 */
module.exports = parseSaveFile;

let libxmljs = require('libxmljs');
let fs = require('fs');
let data = require('../public/planner/js/data/sprites');
let uuid = require('uuid');
let AdmZip = require('adm-zip');

// list of objects that are considered buildings
// objects/terrain to exclude from output
// what to rename objects to
var objectNameMap = {
    "rarecrow" : "scarecrow",
    "iridium sprinkler" : "irid-sprinkler",
    "quality sprinkler" : "q-sprinkler",
    "bee house" : "bee-hive",
    "slime hutch" : "slime-hutch",
    "stone cabin": "stone-cabin",
    "plank cabin": "plank-cabin",
    "log cabin": "log-cabin"
};

var clumpNameMap = {
    600: "large-stump",
    602: "large-log",
    672: "large-rock"
};

function parseSaveFile(filePath) {
    // resulting data structure
    var importData = {
        buildings: [],
        tiles: [],
        options: {}
    };

    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, (err, save) => {
            if (err) throw err;

            // get first two bytes from the file
            let firstByte = save.slice(0, 2);

            // check if we're dealing with a .zip file
            // According to the https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
            // First two bytes will equal to PK
            if (firstByte.compare(new Buffer('PK')) === 0)  {
                let zip = new AdmZip(filePath);
                let entries = zip.getEntries();

                if (!entries || !entries.length) {
                    console.error('Failed to extract zip, entry check failed');
                    reject('Failed to extract zip');
                    return;
                }

                try {
                    save = entries[0].getData();
                } catch (e) {
                    console.error(e, 'Failed to read file from the zip');
                    reject(e.message , 'Failed to read file from the zip');
                    return;
                }
            }

            // savefile name
            let saveId = uuid.v4();
            let xmlFileName = uuid.v4() +'.xml';
            let saveFileName = saveId +'.json';
            let xmlDoc;

            // to this point, save data is a Buffer
            save = save.toString('utf8');

            // Don't save the saves...
            // we don't need to wait for this, so just do it async
            // fs.writeFile(__dirname +'/../saves/'+ xmlFileName, save, function (err) {
            //     if (err) {
            //         console.error('Failed to move save xml', err);
            //     }
            //
            //     // also delete the tmp file we don't need anymore
            // });

            // delete temp file, we have the file in memory, don't need to physical file anymore
            // just do it async, no need to wait for it
            fs.unlink(filePath, function (err) {
                if (err) {
                    console.error('Failed to delete temp file', err);
                }
            });

            try {
                xmlDoc = libxmljs.parseXml(save);
            } catch (e) {
                return reject('Unabled to parse saveGame file');
            }

            let playerName, farmName;
            let farmLocation, farmItems, buildings, resourceClumps, terrainFeatures, farmLayout = [];

            try {
                farmLayout = xmlDoc.get('//whichFarm').text();
            } catch (e) {
                // no farm layout found, old save probably
            }

            try {
                // xpath queries
                playerName = xmlDoc.find('player/name')[0];
                farmName = xmlDoc.find('player/farmName')[0];

                farmLocation = xmlDoc.find('//GameLocation[@xsi:type="Farm"]', {xsi: 'http://www.w3.org/2001/XMLSchema-instance'})[0];

                farmItems = xmlDoc.find('//GameLocation[@xsi:type="Farm"]/objects/item', {xsi: 'http://www.w3.org/2001/XMLSchema-instance'});
                buildings = farmLocation.find('buildings/Building');
                resourceClumps = farmLocation.find('resourceClumps/ResourceClump');
                terrainFeatures = farmLocation.find('terrainFeatures/item');
            } catch (e) {
                reject(e.message +' Failed to parse saveGameFile');
            }

            /**Farm layout **/
            // translate layouts
            switch (parseInt(farmLayout)) {
                case 1:
                    importData.options.layout = 'fishing';
                    break;
                case 2:
                    importData.options.layout = 'foraging';
                    break;
                case 3:
                    importData.options.layout = 'mining';
                    break;
                case 4:
                    importData.options.layout = 'combat';
                    break;
            }

            // so now we have all the necessary information about the player and his farm
            /** FarmItems **/
            (farmItems || []).forEach(function (item) {
                let x = item.find('key/Vector2/X')[0].text();
                let y = item.find('key/Vector2/Y')[0].text();
                let name = item.find('value/Object/name')[0].text();

                var convertedCoords = _convertCoords(x, y);
                var type = _objectToTile(name);

                if (!type) return;

                var obj = { type: type, x: convertedCoords.x, y: convertedCoords.y };

                if (_isBuilding(type)){
                    importData.buildings.push(obj);
                } else {
                    importData.tiles.push(obj);
                }
            });

            /** Buildings **/
            (buildings || []).forEach(function (building) {
                let x = building.find('tileX')[0].text();
                let y = building.find('tileY')[0].text();
                let convertedCoords = _convertCoords(x, y);

                let type = _buildingToTile(building.find('buildingType')[0].text());

                if (!type) {
                    return;
                }

                importData.buildings.push({type: (objectNameMap[type] || type), x: convertedCoords.x, y: convertedCoords.y});
            });

            /** Resource Clumps **/
            (resourceClumps || []).forEach(function (clump) {
                let x = clump.find('tile/X')[0].text();
                let y = clump.find('tile/Y')[0].text();

                let convertedCoords = _convertCoords(x, y);
                var type = _clumpToTile(clump.find('parentSheetIndex')[0].text());

                if (!type) return;

                var obj = { type: type, x: convertedCoords.x, y: convertedCoords.y };
                importData.buildings.push(obj);
            });


            /** TerrainFeatures **/
            (terrainFeatures || []).forEach(function (terrainFeature) {
                let x =  terrainFeature.find('key/Vector2/X')[0].text();
                let y =  terrainFeature.find('key/Vector2/Y')[0].text();

                let type = null;
                let value = null;
                let fruitIndex = null;

                try {
                    fruitIndex = _terrainToTile(terrainFeature.find('value/TerrainFeature/indexOfFruit')[0].text());
                } catch(e) {}
                try {
                    value = _terrainToTile(terrainFeature.find('value/TerrainFeature/whichFloor')[0].text());
                } catch(e) {}
                try {
                    type = _terrainToTile(terrainFeature.find('value/TerrainFeature')[0].attr('type').value());
                } catch(e) {}

                let convertedCoords = _convertCoords(x, y);


                // Floors
                if (value) {
                    switch (parseInt(value)) {
                        case 0:
                            type = 'wood-floor';
                            break;
                        case 1:
                            type = 'stone-floor';
                            break;
                        case 2:
                            type = 'weathered-floor';
                            break;
                        case 3:
                            type = 'crystal-floor';
                            break;
                        case 4:
                            type = 'straw-floor';
                            break;
                        case 5:
                            type = 'gravel-path';
                            break;
                        case 6:
                            type = 'wood-path';
                            break;
                        case 7:
                            type = 'crystal-path';
                            break;
                        case 9:
                            type = 'steppingstone-path';
                            break;
                        default:
                            type = 'road';
                            break;
                    }
                }

                if (type == 'hoedirt') {
                    let cropIndex = 0;

                    try {
                        cropIndex = +_terrainToTile(terrainFeature.find('value/TerrainFeature/crop/indexOfHarvest')[0].text());

                    } catch (e) {}

                    var trellisCrops = [188, 304, 398];
                    var flowers = [591, 597, 593, 376, 595];

                    if (trellisCrops.indexOf(cropIndex) !== -1) {
                        type = 'trellis';
                    }

                    if (flowers.indexOf(cropIndex) !== -1) {
                        type = 'tulips';
                    }
                }

                if (!type) return;

                // Fruit trees
                if (type == 'fruittree') {
                    switch (parseInt(fruitIndex)) {
                        case 634:
                            type = 'apricot';
                            break;
                        case 638:
                            type = 'cherry-tree';
                            break;
                        case 635:
                            type = 'orange-tree';
                            break;
                        case 636:
                            type = 'peach';
                            break;
                        case 637:
                            type = 'pomegranate';
                            break;
                        case 613:
                            type = 'apple';
                            break;
                        default:
                            type = 'cherry-tree';
                            break;
                    }

                    // move up for on tile each axis as the fruit trees are 3x3
                    convertedCoords.x -= 16;
                    convertedCoords.y -= 16;
                }

                var obj = {type: type, x: convertedCoords.x, y: convertedCoords.y};

                if (_isBuilding(type)){
                    importData.buildings.push(obj);
                } else {
                    importData.tiles.push(obj);
                }
            });

            importData.xmlSaveFile = xmlFileName;
            importData.saveFile = saveFileName;
            importData.saveId = saveId;

            let saveData = null;

            // even though we no longer save the json into a file, still try to stringify it as sanity check
            try {
                saveData = JSON.stringify(importData);
            } catch (e) {
                reject(e, 'Failed to parse importData');
                return;
            }

            resolve(importData);
        });


    });
}

function _isBuilding(name) {
    // returns true if it's considered a building by the planner
    if (name.toLowerCase().indexOf("sprinkler") !== -1) {
        return true;
    }

    return !!data.buildings[name.toLowerCase()];
}

function _objectToTile(name){
    name = name.toLowerCase();
    return (objectNameMap[name] || name).replace(/ /g,"-");
}


function _buildingToTile(name) {
    return name.toLowerCase().replace(/big\s|deluxe\s/,"").replace(/ /g,"-");
}

function _terrainToTile(name) {
    // Convert terrain feature name to tile type
    return name.toLowerCase().replace(/\s/g,"-");
}

function _clumpToTile(parentSheetIndex) {
    // Convert resource clump parentSheetIndex to tile type
    return (clumpNameMap[parentSheetIndex] || "");
}

function _convertCoords(x, y) {
    return {x: x * 16, y: y * 16};
}