/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

function Importer(board) {
    this.board = board;

    return this;
}

Importer.prototype.parseData = function parseData(event) {
    // create a JQuery Object from the file data
    var that = this;
    var xmlDoc = $.parseXML( event.target.result );
    var $xml = $( xmlDoc );

    var name = $xml.find("player > name").text();

    // get farm name
    var farmname = $xml.find("player farmName").text();

    // get the farm Location
    var $farm = $xml.find("GameLocation[xsi\\:type='Farm']:first").first();

    // resulting data structure
    var importData = {
        buildings: [],
        tiles: []
    };

    // Parse all the 'objects', includes fences, sprinklers, twigs, stones, etc.
    $farm.find("GameLocation > objects > item").each(function(){
        var x = parseInt($(this).find("key:first X").text(), 10);
        var y = parseInt($(this).find("key:first Y").text(), 10);
        var convertedCoords = that.convertCoords(x, y);
        var type = that.objectToTile(
            $(this).find("Object:first > Name:First").text(),
            $(this).find("Object:first").attr("xsi:type")
        );
        if (!type) return;

        var obj = { type: type, x: convertedCoords.x, y: convertedCoords.y };

        if (that.isBuilding(type)){
            importData.buildings.push(obj);
        } else {
            importData.tiles.push(obj);
        }
    });
    // Parse all the buildings
    $farm.find("buildings > Building").each(function(tile){
        var x = parseInt($(this).find("tileX:first").text(), 10);
        var y = parseInt($(this).find("tileY:first").text(), 10);
        var convertedCoords = that.convertCoords(x, y);
        var type = that.buildingToTile($(this).find("buildingType:first").text());
        if (!type) {
            return;
        }

        importData.buildings.push({type: (objectNameMap[type] || type), x: convertedCoords.x, y: convertedCoords.y});
    });
    // Parse the 'terrainFeatures', includes Flooring, Trees, HoeDirt etc.
    $farm.find("terrainFeatures > item").each(function(i, farmItem){
        var x = parseInt($(this).find("key:first X").text(), 10);
        var y = parseInt($(this).find("key:first Y").text(), 10);
        var type = that.terrainToTile($(this).find("TerrainFeature").attr("xsi:type"));
        var value = that.terrainToTile($(this).find("TerrainFeature > whichFloor:first").text());
        var fruitIndex = that.terrainToTile($(this).find("TerrainFeature > indexOfFruit:first").text());
        var convertedCoords = that.convertCoords(x, y);

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
            var cropIndex = +that.terrainToTile($(this).find("TerrainFeature > crop:first > indexOfHarvest:first").text());

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
            convertedCoords.x -= board.tileSize;
            convertedCoords.y -= board.tileSize;
        }

        var obj = {type: type, x: convertedCoords.x, y: convertedCoords.y};

        if (that.isBuilding(type)){
            importData.buildings.push(obj);
        } else {
            importData.tiles.push(obj);
        }
    });

    return importData;
};

Importer.prototype.isBuilding = function isBuilding(name) {
    // returns true if it's considered a building by the planner
    if (name.toLowerCase().indexOf("sprinkler") !== -1) {
        return true;
    }

    return !!data.buildings[name.toLowerCase()];
};

Importer.prototype.objectToTile = function objectToTile(name){
    name = name.toLowerCase();
    return (objectNameMap[name] || name).replace(/ /g,"-");
};


Importer.prototype.buildingToTile = function buildingToTile(name) {
    return name.toLowerCase().replace(/big\s|deluxe\s/,"");
};

Importer.prototype.terrainToTile = function terrainToTile(name) {
    // Convert terrain feature name to tile type
    return name.toLowerCase().replace(/\s/g,"-");
};

Importer.prototype.convertCoords = function convertCoords(x, y) {
    return {x: x * this.board.tileSize, y: y * this.board.tileSize};
};


// list of objects that are considered buildings
// objects/terrain to exclude from output
// what to rename objects to
var objectNameMap = {
    "rarecrow" : "scarecrow",
    "iridium sprinkler" : "irid-sprinkler",
    "quality sprinkler" : "q-sprinkler",
    "bee house" : "bee-hive",
    "slime hutch" : "slime-hutch"
};