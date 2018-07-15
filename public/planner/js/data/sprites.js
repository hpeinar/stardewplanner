/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

var data = {
  tiles: [
    {
      name: 'Tiles',
      shortName: 'T',
      tiles: [
        'test'
      ]
    }
  ],
  buildings: [
    {
      name: "Buildings",
      shortName: "V",
      buildings: [
        {
            "id": "test-building",
            "name": "Test building",
            "sprite": "./img/tiles/test-building.png",
            "width": 120,
            "height": 120,
            // "highlight": {
            //     "path": ["M0,64", "L16,64", "L16,48", "L32,48", "L32,32", "L48,32", "L48,16", "L64,16", "L64,0", "L208,0",
            //         "L208,16", "L224,16", "L224,32", "L240,32", "L240,48", "L256,48", "L256,64", "L272,64", "L272,208",
            //         "L256,208", "L256,224", "L240,224", "L240,240", "L224,240", "L224,256", "L208,256", "L208,272", "L64,272",
            //         "L64,256", "L48,256", "L48,240", "L32,240", "L32,224", "L16,224", "L16,208", "L0,208",
            //         "z"],
            //     "width": 272,
            //     "height": 272,
            //     "color": "#000066"
            // }
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