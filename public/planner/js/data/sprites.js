/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

var data = {
  tiles: [
    {
      name: 'Tiles', // category name, will appear in the menu
      shortName: 'T', // short menu, will appear in the menu for small screens
      tiles: [
        'test' // tile name, must be same as image file name
      ]
    }
  ],
  buildings: [
    {
      name: "Buildings", // building category name, will appear in the menu
      shortName: "V", // short name for menu, will appear for small screens
      buildings: [
        {
            "id": "test-building", // building ID, must not contain spaces or other special characters
            "name": "Test building", // building name in the menu
            "sprite": "./img/tiles/test-building.png", // image name
            "width": 120, // width in pixels
            "height": 120, // height in pixels
        }
      ]
    }
  ],
  tilesMap: [], // do not edit
  buildingsMap: {
    "house": {
      "id": "house",
      "name": "House",
      "sprite": "./img/tiles/house.png",
      "width": 10,
      "height": 10,
    }  } // do not edit
};

// DO NOT EDIT BELOW THIS LINE

// for quicker access we'll create maps with all tiles and buildings
data.tiles.forEach(function (tileCategory) {
  tileCategory.tiles.forEach(function (tile) {
    data.tilesMap.push(tile);
  });
});

data.buildings.forEach(function (buildingCategory) {
  buildingCategory.buildings.forEach(function (building) {
    data.buildingsMap[building.id] = building;
  });
});

// nodeJS would also like to use this file
if (typeof module !== 'undefined') {
  module.exports = data;
}