/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

/**
 * Board constructor
 * @param containerId
 * @param width
 * @param height
 * @returns {Board}
 * @constructor
 */

function Board (containerId, width, height) {
    this.R = Snap(containerId);

    this.width = width;
    this.height = height;
    this.tileSize = 16;
    this.tiles = [];
    this.buildings = [];
    this.grid = null;
    this.layout = null;
    this.background = null;
    this.brush = new Brush(this);
    this.highlightsState = [];
    this.keepHighlights = [];
    this.placingBuilding = null;
    this.restrictionCheck = true;
    this.restrictionMap = {};
    this.restrictionHelpers = [];
    this.dataLayerElements = [];
    this.house = null;
    this.greenhouse = null;

    // load regular layout by default
    this.loadLayout(layouts.regular);

    this.positionHelpers = [this.R.text(0, 30, 'X: 0').attr({fill: 'white', pointerEvents: 'none', opacity: 0}), this.R.text(0, 15, 'Y: 0').attr({fill: 'white', pointerEvents: 'none', opacity: 0})];

    this.ghostPath = null; // used for debugging...
    this.ghostPathPoints = []; // used for debugging...
    this.ghosting = false;
    this.ghostBuildings = [];

    this.drawGrid();
    this.drawHelpers();
    this.preDrawSprites();

    this.R.mousemove(this.mousemove.bind(this));

    // yes... same event name
    this.R.mouseup(this.mousedown.bind(this));

    // bind keybinds to window
    $(window).keydown(this.keydown.bind(this));
    $(window).keyup(this.keyup.bind(this));

    this.R.drag(this.dragMove, this.dragStart, this.dragEnd, this, this, this);

    return this;
}

Board.prototype.loadRestrictionLayers = function loadRestrictionLayers (layoutName) {
    var board = this;

    return Promise.all([
        $.getJSON(Board.toFullPath('js/data/layer-information/'+ layoutName +'_accessible.json')),
        $.getJSON(Board.toFullPath('js/data/layer-information/'+ layoutName +'_buildable.json')),
        $.getJSON(Board.toFullPath('js/data/layer-information/'+ layoutName +'_tillable.json')),
    ]).then(function (restrictionLayers) {
        try {
            board.restrictionMap.accessible = restrictionLayers[0]['accessible.impassable'].Tiles;
            board.restrictionMap.buildable = board.mergeRestrictionArrays(restrictionLayers[1]['buildable.not-buildable'].Tiles, board.restrictionMap.accessible);
            board.restrictionMap.tillable = board.mergeRestrictionArrays(restrictionLayers[2]['tillable.not-tillable'].Tiles.concat(restrictionLayers[2]['tillable.occupied'].Tiles), board.restrictionMap.accessible);
        } catch (error) {
            console.error(error, 'While initializing restriction layers');
            throw 'Problem while loading restriction layers';
        }
    }).catch(function (error) {
        // there was a problem including restriction layers
        // we'll just ignore the errors and not do restriction checking
        console.error(error, 'While loading restriction layers');
        board.restrictionMap = {};
        this.restrictionCheck = false;
    });
};

Board.prototype.mergeRestrictionArrays = function mergeRestrictionArrays (arrayOne, arrayTwo) {
  arrayTwo.forEach(function (arrayTwoElement) {
     if (arrayOne.indexOf(arrayTwoElement) === -1) {
         arrayOne.push(arrayTwoElement);
     }
  });

  return arrayOne;
};

Board.prototype.loadLayout = function loadLayout (layout) {
    if (this.background) {
        this.background.remove();
    }

    this.background = this.R.image(Board.toFullPath('img/layouts/'+ layout.backgroundImage), 0, 0, layout.width, layout.height);
    this.background.toFront();

    if (this.house) {
        this.house.remove();
        this.house = null;
    }

    if (this.greenhouse) {
        this.greenhouse.remove();
        this.greenhouse = null;
    }

    this.loadRestrictionLayers(layout.name);

    if (layout.house) {
        this.house = new Building(this, 'house', layout.house.x*this.tileSize, layout.house.y*this.tileSize, false, true);
    }

    if (layout.greenhouse) {
        this.greenhouse = new Building(this, 'greenhouse', layout.greenhouse.x*this.tileSize, layout.greenhouse.y*this.tileSize, false, true);
    }

    this.layout = layout;
};

Board.prototype.toggleGreenhouse = function toggleGreenhouse(forcedState) {
    if (!this.layout.greenhouse) {
        return;
    }

    var currentGreenhouse = this.greenhouse.type;
    var newState = (currentGreenhouse == 'greenhouse') ? 'greenhouse-fixed' : 'greenhouse';

    this.greenhouse.remove();

    if (forcedState) {
        newState = forcedState;
    }

    this.greenhouse = new Building(this, newState, this.layout.greenhouse.x*this.tileSize, this.layout.greenhouse.y*this.tileSize, false, true);
};


Board.prototype.showHighlights = function showHighlights(type) {
    var board = this;

    if (type && board.keepHighlights.indexOf(type) === -1) {
        board.keepHighlights.push(type);
    }

    board.buildings.forEach(function (building) {
        if (board.keepHighlights.indexOf(building.typeGroup) !== -1) {
            building.moveHighlight();
        }
    });
};

Board.prototype.hideHighlights = function hideHighlights(type) {
    var board = this;
    var index = board.keepHighlights.indexOf(type);
    if (index >= 0) {
        board.keepHighlights.splice(board.keepHighlights.indexOf(type), 1);

        board.buildings.forEach(function (building) {
            if (building.highlight && board.keepHighlights.indexOf(building.typeGroup) === -1) {
                building.highlight.attr('opacity', 0);
            }
        });
    }
};

Board.prototype.drawHelpers = function drawHelpers() {
    var helperAttr = {
        fill: 'none',
        pointerEvents: 'none',
        stroke: '#000',
        strokeWidth: 0.5,
        opacity: 1
    };

    this.helperX = this.R.rect(0, 0, this.width, this.tileSize);
    this.helperY = this.R.rect(0, 0, this.tileSize, this.height);

    this.helperX.attr(helperAttr);
    this.helperY.attr(helperAttr);
};

Board.prototype.moveHelpers = function moveHelpers(pos) {
    this.helperX.attr({
        y: pos.y
    });
    this.helperY.attr({
        x: pos.x
    });
};

/**
 * Deselects building
 */
Board.prototype.deselectBuilding = function deselectBuilding() {
    var board = this;
    if (board.placingBuilding) {
        board.removeBuilding(board.placingBuilding);
    }
};

/**
 * Deletes building from the buildings list
 * @param building
 */
Board.prototype.removeBuilding = function removeBuilding(building) {
    var board = this;
    var bIndex = board.buildings.map(function (b) { return (b || {}).uuid; }).indexOf((building || {}).uuid);

    if (bIndex >= 0) {
        board.buildings.splice(bIndex, 1);
    }

    building.remove();

    if ((board.placingBuilding || {}).uuid === building.uuid) {
        board.placingBuilding = null;
    }
    window.dispatchEvent(new Event('updateCount'));
};

/**
 * Starts placing building ("picks" it up)
 * @param id
 * @param restriction
 * @param building
 * @param x
 * @param y
 */
Board.prototype.placeBuilding = function placeBuilding(id, restriction, building, x, y) {
    var board = this;

    if (building && board.brush.erase) {
        board.removeBuilding(building);
        return;
    }

    if (!building) {
        this.deselectBuilding();
        building = new Building(this, id, (x || 0), (y || 250), true, undefined, restriction);
    }

    board.brush.changeBrush('select');
    board.placingBuilding = building;
};

/**
 * Brings all buildings to top (uses toBack because it is reverted for snapsvg plugin)
 */
Board.prototype.buildingsToTop = function buildingsToTop(e) {
    // hold buildings on top
    this.buildings.forEach(function (b) {
        if (b) {
            b.sprite.toBack();
        }
    });
    this.buildings.forEach(function (b) {
        if (b.highlight) {
            b.highlight.toBack();
        }
    });

    this.helperX.toBack();
    this.helperY.toBack();
    this.brush.rect.toBack();
};


/**
 * Handles darg start, if building placing is in action, cancles drag
 * @param x
 * @param y
 * @param e
 */
Board.prototype.dragStart = function dragStart(x, y, e) {
    this.brush.lock();
};

/**
 * Handles drag move event
 * @param dx
 * @param dy
 * @param x
 * @param y
 * @param e
 */
Board.prototype.dragMove = function dragMove(dx, dy, x, y, e) {
    if (this.brush.freemode) {
        var pos = Board.normalizePos(e, this.background.node, this.tileSize);
        this.drawTile(pos, this.brush.type);
    } else {
        this.brush.drag(this.snap(Board.normalizePos(e, this.background.node)));
    }
};

/**
 * Handles dragEnd event
 * @param e
 */
Board.prototype.dragEnd = function dragEnd(e) {
    this.brush.move(this.snap(Board.normalizePos(e, this.background.node)));
    this.brush.unlock();

    // check if rect happens to be inside of restricted area
    if (!this.restrictionCheck || ($(e.target).data('custom-type') !== 'building' && (!this.brush.type || !this.checkRestriction(this.restrictionMap[this.brush.restriction], this.brush.rect)))) {
        this.drawTiles(this.brush.rect, this.brush.type);
    }

    this.brush.reset();
    this.buildingsToTop();
};

/**
 * Handles board mousedown event
 * @param e
 */
Board.prototype.mousedown = function mousedown(e) {
    var board = this;
    var pos = Board.normalizePos(e, null, board.tileSize);

    if (board.ghosting) {

        if (e.shiftKey) {
            pos.x += board.tileSize;
        }

        if (e.altKey) {
            pos.y += board.tileSize;
        }

        board.ghostPathPoints.push('L'+ pos.x +','+ pos.y);
        board.drawGhostPath();
    }

    if (board.placingBuilding) {

        if(this.checkRestriction(this.restrictionMap[board.placingBuilding.restriction], this.placingBuilding.sprite)) {
            this.removeBuilding(this.placingBuilding);
            return;
        }
        var bIndex = board.buildings.map(function (b) { return (b || {}).uuid; }).indexOf((board.placingBuilding || {}).uuid);
        var tileX = pos.x/board.tileSize;
        var tileY = pos.y/board.tileSize;
        var buildingId = board.placingBuilding.type;
        var buildingRestriction = board.placingBuilding.restriction;

        board.placingBuilding.move(pos);
        board.placingBuilding.putDown();

        // if it is a torch and placed on a fence, we turn the fence into torch-{type}-fence
        if (board.placingBuilding.type == 'torch' && (board.tiles[tileY] && board.tiles[tileY][tileX] && board.tiles[tileY][tileX].attr('tileType').indexOf('fence') !== -1)) {
            board.drawTile(pos, 'torch-'+ board.tiles[tileY][tileX].attr('tileType'), true);

            board.placingBuilding.remove();
        } else if (bIndex === -1) {
            board.buildings.push(board.placingBuilding);
        }

        board.placingBuilding = null;

        if (e.ctrlKey || e.metaKey || e.shiftKey) {
            setTimeout(function () {
                board.placeBuilding(buildingId, buildingRestriction, null, pos.x, pos.y);
            }, 1);
            e.preventDefault();
        } else {
            board.brush.restoreBrush();
        }
        window.dispatchEvent(new Event('updateCount'));
    }
};

Board.prototype.drawGhostPath = function drawGhostPath () {
    var board = this;

    if (board.ghostPath) {
        board.ghostPath.remove();
    }

    var tempPath = 'M'+ board.ghostPathPoints.join('').substring(1);

    board.ghostPath = board.R.path(tempPath);

    board.ghostPath.attr({
        fill: 'none',
        stroke: 'blue',
        strokeWidth: 3
    });
};

Board.prototype.drawDataLayer = function drawDataLayer (dataLayer) {
    var board = this;

    // clear old layers before drawing new
    board.removeDataLayers();

    if (!dataLayer || !dataLayer.length) {
        return;
    }

    dataLayer.forEach(function (dataLayerTile) {
        var elementPosition = dataLayerTile.split(',').map(function (v) { return +v.trim() });
        var elementPoint = { x: elementPosition[0] * board.tileSize, y: elementPosition[1] * board.tileSize };
        var newElement = board.R.paper.rect(elementPoint.x, elementPoint.y, board.tileSize, board.tileSize);
        newElement.attr({
            fill: "#ff0000",
            "fill-opacity": 0.5
        });
        board.dataLayerElements.push(newElement);
    });
};

Board.prototype.removeDataLayers = function removeDataLayers () {
    board.dataLayerElements.forEach(function (dataLayerElement) {
        dataLayerElement.remove();
    });

    board.dataLayerElements = [];
};

/**
 * Checks if element bbox intersects with path
 * @param restrictedArea
 * @param element
 * @returns {*}
 */
Board.prototype.checkPathRestriction = function checkPathRestriction (restrictionMap, element) {
    var bb = element.getBBox();
    var board = this;
    var points = [];

    if (!this.restrictionCheck || !restrictionMap) {
        return false;
    }

    for (var x = bb.x; x < bb.x + bb.width; x += board.tileSize) {
        for (var y = bb.y; y < bb.y + bb.height; y += board.tileSize) {
            points.push({ x: x, y: y });
        }
    }

    return board._checkResitrction(restrictionMap, points);
};

/**
 * Checks if rect is in restrictionPath or not
 * @param restrictionMap
 * @param rect
 */
Board.prototype.checkRestriction = function checkRestriction (restrictionMap, rect) {
    var board = this;
    if (!this.restrictionCheck || !restrictionMap) {
        return false;
    }

    var data = {};
    if (rect.type) {
        data = {
            x: +rect.attr('x') + 1,
            y: +rect.attr('y') + 1,
            width: +rect.attr('width') - 2,
            height: +rect.attr('height') - 2
        };
    } else {
        data = {
            x: +rect.x + 1,
            y: +rect.y + 1,
            width: +rect.width - 2,
            height: +rect.height - 2
        };
    }

    var points = [
        { x: data.x, y: data.y},
        { x: data.x + data.width, y: data.y},
        { x: data.x, y: data.y + data.height},
        { x: data.x + data.width, y: data.y + data.height}
    ];

    return board._checkResitrction(restrictionMap, points);
};

Board.prototype._checkResitrction = function _checkRestriction (restrictionMap, points) {
    var board = this;
    if (board.restrictionHelpers.length) {
        board.restrictionHelpers.forEach(function (restrictionHelper) {
            restrictionHelper.remove();
        });

        board.restrictionHelpers = [];
    }
    var restrictPlacement = false;

    points.forEach(function (p) {
        var normalizedPoint = board.snap(p);
        var restrictionCheckPoint = normalizedPoint.x / board.tileSize +', '+ normalizedPoint.y / board.tileSize;

        var isPlacementRestricted = restrictionMap.indexOf(restrictionCheckPoint) !== -1;

        // true means that there is a restriction check
        if (isPlacementRestricted) {
            var el = board.R.paper.rect(normalizedPoint.x, normalizedPoint.y, board.tileSize, board.tileSize);
            el.attr({
                fill: "#ff0000",
                "fill-opacity": 0.5
            });
            board.restrictionHelpers.push(el);
        }

        if (!restrictPlacement && isPlacementRestricted) {
            restrictPlacement = isPlacementRestricted;
        }
    });

    return restrictPlacement;
};

/**
 * Handles mouse movement over the background (considered to be our "canvas")
 * @param e
 */
Board.prototype.mousemove = function mousemove(e) {
    if (this.placingBuilding) {
        if(this.checkPathRestriction(this.restrictionMap[this.placingBuilding.restriction], this.placingBuilding)) {
            // sorry, can't build here
            // TODO: I like red. Try to figure out how to use red here
            this.placingBuilding.sprite.attr({
                opacity: .2
            });
        } else {
            // build away
            this.placingBuilding.sprite.attr({
                opacity: .7
            });
        }

        this.placingBuilding.move(Board.normalizePos(e, null, this.tileSize));
    }

    // show pos
    var snappedPos = Board.normalizePos(e, null, this.tileSize);
    this.positionHelpers[0].attr({
        'text': 'Y: '+ (+snappedPos.y / this.tileSize) +' ('+ (+snappedPos.y) +')',
        'y': snappedPos.y - 16,
        'x': snappedPos.x - 3*16
    }).toBack();
    this.positionHelpers[1].attr({
        'text': 'X: '+ (+snappedPos.x / this.tileSize) +' ('+ (+snappedPos.x) +')',
        'y': snappedPos.y,
        'x': snappedPos.x - 3*16
    }).toBack();


    //move the brush
    this.brush.move(snappedPos);

    // move helpers
    this.moveHelpers(snappedPos);
};

/**
 * Handles key presses
 * @param e
 */
Board.prototype.keydown = function keydown(e) {
    // 'Del'
    if (e.which == 46) {
        this.deselectBuilding();
    }

    // 'E' for eraser
    if (e.which === 69) {
        this.deselectBuilding();

        if (!this.brush.erase) {
            this.brush.changeBrush('eraser');
        } else {
            this.brush.restoreBrush();
        }
    }

    // 'S' for select tool
    if (e.which === 83) {
        this.deselectBuilding();

        if (!this.brush.type && !this.brush.erase) {
            this.brush.restoreBrush();
        } else {
            this.brush.changeBrush('select');
        }
    }

    // 'w' for highlights
    if (e.which === 87) {
        this.highlightsState = [].concat(this.keepHighlights);

        this.showHighlights('sprinkler');
        this.showHighlights('scarecrow');
        this.showHighlights('hive');
        this.showHighlights('junimo');
    }

    // 'Esc'
    if (e.which === 27) {
        if (this.placingBuilding) {
            this.deselectBuilding();
            this.brush.restoreBrush();
        }

        this.brush.unlock();
        this.brush.reset();
    }

    e.stopPropagation();
};

/**
 * Keyup handler
 * @param e
 */
Board.prototype.keyup = function keyup(e) {
    // 'w' for highlights
    if (e.which === 87) {
        if (this.highlightsState.indexOf('sprinkler') === -1) {
            this.hideHighlights('sprinkler');
        }

        if (this.highlightsState.indexOf('scarecrow') === -1) {
            this.hideHighlights('scarecrow');
        }

        if (this.highlightsState.indexOf('hive') === -1) {
            this.hideHighlights('hive');
        }

        if (this.highlightsState.indexOf('junimo') === -1) {
            this.hideHighlights('junimo');
        }
    }
};

/**
 * Snaps the given x,y obj to closest point
 * @param pos
 */
Board.prototype.snap = function snap(pos) {
    return {
        x: Math.floor(pos.x / this.tileSize) * this.tileSize,
        y: Math.floor(pos.y / this.tileSize) * this.tileSize
    }
};

/**
 * Normalizes position for all browsers
 * @param e
 * @newTarget
 * @snap
 * @returns {{x: number, y: number}}
 */
Board.normalizePos = function normalizePos(e, newTarget, snap) {
    var target = (newTarget || e.currentTarget);
    var rect = target.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var offsetY = e.clientY - rect.top;

    if (snap) {
        offsetX = Math.floor(offsetX / snap) * snap;
        offsetY = Math.floor(offsetY / snap) * snap;
    }

    return {
        x: offsetX,
        y: offsetY
    }
};

/**
 * Draws tiles to given area or location
 * @param area {R.rect|{x,y}}
 * @param tile
 */
Board.prototype.drawTiles = function drawTiles(area, tile) {
    // first we check path restriction
    if (this.restrictionCheck && this.brush.type && this.checkPathRestriction(this.restrictionMap[this.brush.restriction], area)) {
        return;
    }

    // we are drawing to an area (most likely from a brush)
    if (area.type === 'rect') {

        // Note: Could draw areas of tiles as rects with fill to url(#)
        // but then there is problem with deleting them

        var areaData = {
            x: +area.attr('x'),
            y: +area.attr('y'),
            width: +area.attr('width'),
            height: +area.attr('height')
        };

        // loop this area and draw tiles on every square
        for (var y = areaData.y;y < areaData.y + areaData.height;y += this.tileSize) {
            for (var x = areaData.x;x < areaData.x + areaData.width;x += this.tileSize) {
                this.drawTile({
                    x: x,
                    y: y
                }, tile);
            }
        }

        window.dispatchEvent(new Event('updateCount'));
        return;
    }

    // not area, just draw this one tile to location
    this.drawTile(area, tile);
    window.dispatchEvent(new Event('updateCount'));
};

/**
 * Draws tile to given location, also does all the checking work
 * @param location
 * @param tile
 * @param replace
 * @return {*}
 */
Board.prototype.drawTile = function drawTile(location, tile, replace) {
    var hardX = location.x / this.tileSize;
    var hardY = location.y / this.tileSize;

    if (!this.tiles[hardY]) {
        this.tiles[hardY] = [];
    }

    if (tile === 'select') {
        return;
    }

    if (this.tiles[hardY][hardX]) {
        // there seems to be a tile in place here already, remove it

        if (!this.brush.overwriting && !this.brush.erase && !replace) {
            return;
        } else {
            this.tiles[hardY][hardX].remove();
            this.tiles[hardY][hardX] = null;

            if (this.brush.erase) {
                return;
            }
        }
    }

    if (tile) {
        var newTile = this.R.use(tile);
        newTile.attr({
            x: location.x,
            y: location.y,
            tileType: tile,
            pointerEvents: 'none'
        });

        this.tiles[hardY][hardX] = newTile;

        return newTile;
    }
};

/**
 * Draws grid. This is just to visually ease planning
 * Uses path tag in pattern tag and full width/height rect to fill the grid. Disables mouseEvents on the fill rect
 */
Board.prototype.drawGrid = function drawGrid() {
    var oneGridBlock = this.R.path('M 16 0 L 0 0 0 16');

    oneGridBlock.attr({
        fill: 'none',
        stroke: 'grey',
        strokeWidth: .5
    });

    var pattern = oneGridBlock.toPattern(0, 0, 16, 16);
    pattern.attr({
        id: 'grid'
    });

    this.grid = this.R.rect(0, 0, this.width, this.height);
    this.grid.attr({
        fill: 'url(#grid)',
        pointerEvents: 'none'
    });
};

/**
 * Inserts all our sprites to defs
 */
Board.prototype.preDrawSprites = function preDrawSprites() {
    data.tiles.forEach(function (tile) {
        var tileImage = this.R.image(Board.toFullPath('img/tiles/'+ tile +'.png'), 0, 0, this.tileSize, this.tileSize);
        tileImage.attr({
            id: tile
        });

        tileImage.toDefs();
    }.bind(this));

    Object.keys(data.buildings).forEach(function (b) {
        var building = data.buildings[b];
        var buildingImage = this.R.image(Board.toFullPath(building.sprite), 0, 0, building.width, building.height);
        buildingImage.attr({
            id: b
        });


        buildingImage.toDefs();
    }.bind(this));
};

/**
 * Exports data to JSON string
 */
Board.prototype.exportData = function exportData() {
    var farmData = {
        tiles: [],
        buildings: []
    };

    this.tiles.forEach(function (yTiles) {
        yTiles.forEach(function (tile) {
            if (tile) {
                var tileData = {
                    type: tile.attr('tileType'),
                    y: tile.attr('y'),
                    x: tile.attr('x')
                };

                if (tileData) {
                    farmData.tiles.push(tileData);
                }
            }
        });
    });

    this.buildings.forEach(function (building) {
        if (!building) {
            return;
        }

        var buildingData = building.convertToData();

        if (buildingData && buildingData.x && buildingData.y) {
            farmData.buildings.push(buildingData);
        }
    });

    return farmData;
};

/**
 * Imports farm data
 * @param data
 * @param cb
 */
Board.prototype.importData = function importData(data, cb) {
    if (!data) {
        return;
    }

    var board = this;
    var farmData = data;

    // import buildings
    farmData.buildings.forEach(function (building) {
        // don't import buildings on 0,0
        if (building.x > 0 || building.y > 0) {
            board.buildings.push(new Building(board, building.type, building.x, building.y))
        }
    });

    // import tiles
    farmData.tiles.forEach(function (tile) {
        board.drawTile(tile, tile.type);
    });

    // draw buildings on tops
    this.buildingsToTop();

    // show highlights
    this.showHighlights();

    if (typeof cb === 'function') {
        cb();
    }

    window.dispatchEvent(new Event('updateCount'));
};

/**
 * Used to import restriction layers from SMAPI 3.0
 *
 *
 * @param restrictionLayerData
 * @param importLayerName
 */
Board.prototype.restrictionLayerImport = function restrictionLayerImport(restrictionLayerData, importLayerName) {
    var board = this;
    console.log('importing restriction layer', restrictionLayerData, importLayerName);
    var dataLayerTiles = restrictionLayerData[importLayerName].Tiles;

    dataLayerTiles.forEach(function (restrictionTile) {
        var location = restrictionTile.split(',');
        var x = +location[0] * board.tileSize;
        var y = +location[1] * board.tileSize;

        if (!board.ghostBuildings[x]) {
            board.ghostBuildings[x] = [];
        }
        var newBuilding = new Building(board, 'placeholder', x, y);
        board.ghostBuildings[x][y] = newBuilding;
    });
};

/**
 * Clears the board
 */
Board.prototype.clear = function clear() {
    var board = this;

    this.tiles.forEach(function (cTiles) {
        if (cTiles) {
            cTiles.forEach(function (tile) {
                tile.remove();
            });
        }
    });

    this.tiles = [];

    this.buildings.forEach(function (building) {
        building.sprite.remove();

        if(building.highlight) {
            building.highlight.remove();
        }

    });

    this.buildings = [];

    this.removeDataLayers();
};

/**
 * Well, you wouldn't believe it, but this function hides stuff
 */
Board.prototype.hideStuff = function hideStuff() {
    var hideMe = {
        opacity: 0
    };

    this.modifiyStuff(hideMe);
};

/**
 * And this function shows the same stuff that was hidden
 */
Board.prototype.showStuff = function showStuff() {
    var showMe = {
        opacity: 1
    };

    this.modifiyStuff(showMe);
};

Board.prototype.modifiyStuff = function modifyStuff(attr) {
    this.helperY.attr(attr);
    this.helperX.attr(attr);
    this.grid.attr(attr);
};

/**
 * Show coordinates
 */
Board.prototype.showCoords = function showCoords() {
    this.positionHelpers.forEach(function (h) {
        h.attr('opacity', 1);
    });
};

/**
 * Hide coordinates
 */
Board.prototype.hideCoords = function hideCoords() {
    this.positionHelpers.forEach(function (h) {
        h.attr('opacity', 0);
    });
};

/**
 * Converts relative path to absolute (this is needed to be able to save SVG's as images)
 * @param relativePath
 * @returns {string}
 */
Board.toFullPath = function toFullPath(relativePath) {
    return window.location.origin + '/planner/'+ relativePath;
};

/**
 * Generates unique uuid
 * @returns {string}
 */
Board.generateGUID = function generateGUID() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

/**
 * Little plugin for snap to support toFront / toBack
 */
Snap.plugin(function (Snap, Element, Paper, glob) {
    var elproto = Element.prototype;
    elproto.toFront = function () {
        this.prependTo(this.paper);
    };
    elproto.toBack = function () {
        this.appendTo(this.paper);
    };
});
