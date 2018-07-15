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
        'square'
      ]
    }
  ],
  buildings: [
    {
      name: 'Utility',
      shortName: 'U',
      buildings: [
        {
          "id": "u_1x2",
          "name": "1x2",
          "sprite": "./img/tiles/u_1x2.png",
          "width": 21,
          "height": 11
        },
        {
          "id": "u_2x2",
          "name": "2x2",
          "sprite": "./img/tiles/u_2x2.png",
          "width": 21,
          "height": 21
        }
      ]
    },
    {
      name: "Architecture", // building category name, will appear in the menu
      shortName: "A", // short name for menu, will appear for small screens
      buildings: [
        {
          "id": "a_castlewall",
          "name": "Castle wall",
          "sprite": "./img/tiles/a_castlewall.png",
          "width": 0,
          "height": 0
        },
        {
          "id": "a_castlewalldiag",
          "name": "Castle wall diagonal",
          "sprite": "./img/tiles/a_castlewalldiag.png",
          "width": 0,
          "height": 0
        },
        {
          "id": "a_castlewallwhorading",
          "name": "Castle wall whorading",
          "sprite": "./img/tiles/a_castlewallwhorading.png",
          "width": 0,
          "height": 0
        }
      ]
    },
    {
      name: "Constructions",
      shortName: "C",
      buildings: [
        {
          "id": "c_beehive",
          "name": "beehive",
          "sprite": "./img/tiles/c_beehive.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_brewtank",
          "name": "brewtank",
          "sprite": "./img/tiles/c_brewtank.png",
          "width": 21,
          "height": 11
        },
        {
          "id": "c_cauldron",
          "name": "cauldron",
          "sprite": "./img/tiles/c_cauldron.png",
          "width": 21,
          "height": 11
        },
        {
          "id": "c_coop",
          "name": "coopve",
          "sprite": "./img/tiles/c_coop.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_forgeandanvil",
          "name": "forgeandanvil",
          "sprite": "./img/tiles/c_forgeandanvil.png",
          "width": 21,
          "height": 11
        },
        {
          "id": "c_furnace",
          "name": "furnace",
          "sprite": "./img/tiles/c_furnace.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_herbgarden",
          "name": "herbgarden",
          "sprite": "./img/tiles/c_herbgarden.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_kiln",
          "name": "kiln",
          "sprite": "./img/tiles/c_kiln.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_lamppost",
          "name": "lamppost",
          "sprite": "./img/tiles/c_lamppost.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_oven",
          "name": "ovenv",
          "sprite": "./img/tiles/c_oven.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_palisadewall",
          "name": "palisadewall",
          "sprite": "./img/tiles/c_palisadewall.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_stairs",
          "name": "stairs",
          "sprite": "./img/tiles/c_stairs.png",
          "width": 21,
          "height": 21
        },
        {
          "id": "c_woodenfence",
          "name": "woodenfence",
          "sprite": "./img/tiles/c_woodenfence.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_woodengate",
          "name": "woodengate",
          "sprite": "./img/tiles/c_woodengate.png",
          "width": 21,
          "height": 21
        },
        {
          "id": "c_woodenwall",
          "name": "woodenwall",
          "sprite": "./img/tiles/c_woodenwall.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "c_woodenwallswstairs",
          "name": "woodenwallswstairs",
          "sprite": "./img/tiles/c_woodenwallswstairs.png",
          "width": 21,
          "height": 11
        },
      ]
    },
    {
      name: "Masonry",
      shortName: "M",
      buildings: [
        {
          "id": "m_angularstonetower",
          "name": "angularstonetower",
          "sprite": "./img/tiles/m_angularstonetower.png",
          "width": 21,
          "height": 21
        },
        {
          "id": "m_bloomery",
          "name": "bloomery",
          "sprite": "./img/tiles/m_bloomery.png",
          "width": 21,
          "height": 11
        },
        {
          "id": "m_flag",
          "name": "flag",
          "sprite": "./img/tiles/m_flag.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "m_stonefence",
          "name": "stonefence",
          "sprite": "./img/tiles/m_stonefence.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "m_stonetower",
          "name": "stonetower",
          "sprite": "./img/tiles/m_stonetower.png",
          "width": 21,
          "height": 21
        },
        {
          "id": "m_stonewall",
          "name": "stonewall",
          "sprite": "./img/tiles/m_stonewall.png",
          "width": 11,
          "height": 11
        },
        {
          "id": "m_stonewallwstairs",
          "name": "stonewallwstairs",
          "sprite": "./img/tiles/m_stonewallwstairs.png",
          "width": 21,
          "height": 21
        },
        {
          "id": "m_well",
          "name": "well",
          "sprite": "./img/tiles/m_well.png",
          "width": 11,
          "height": 11
        }
      ]
    },
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