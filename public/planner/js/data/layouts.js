/**
 * Layouts represent farm maps.
 * @type {{}}
 */
var layouts = {
    regular: {
        name: 'regular',
        backgroundImage: 'full_background.jpg',
        official: true,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    combat: {
        name: 'combat',
        backgroundImage: 'farm_combat.jpg',
        official: true,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    fishing: {
        name: 'fishing',
        backgroundImage: 'farm_fishing.jpg',
        official: true,
        backgroundImageGreenhouse: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    foraging: {
        name: 'foraging',
        backgroundImage: 'farm_foraging.jpg',
        official: true,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    mining: {
        name: 'mining',
        backgroundImage: 'farm_mining.jpg',
        official: true,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    fourcorners: {
        name: 'fourcorners',
        backgroundImage: 'farm_fourcorners.jpg',
        official: true,
        restrictionPath: [].join(''),
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 36,
            y: 25
        },
        width: 1280,
        height: 1280
    },
    "wonderful-farm-life": {
        author: 'taintedwheat & JinxieWinxie',
        url: 'http://community.playstarbound.com/threads/wonderful-farm-life-smapi-version-updated-7-2-now-with-grandpas-memorial-make-your-farm-sick.115384/',
        name: 'wonderful-farm-life',
        prettyName: 'WonderfulFarmLife',
        backgroundImage: 'wonderful-farm-life.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    "hill-top-forest": {
        author: 'Minnue',
        url: 'http://www.nexusmods.com/stardewvalley/mods/601',
        name: 'hill-top-forest',
        prettyName: 'Hill-Top Forest',
        backgroundImage: 'hill-top-forest.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    "alis-farm-map-edit": {
        author: 'Mushfae',
        url: 'http://www.nexusmods.com/stardewvalley/mods/426/',
        name: 'alis-farm-map-edit',
        prettyName: 'Ali\'s Farm map edit',
        backgroundImage: 'alis_farm_map_edit.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
        width: 1280,
        height: 1040
    },
    "alis-flower-farm": {
        author: 'Mushfae',
        url: 'http://www.nexusmods.com/stardewvalley/mods/1266/',
        name: 'alis-flower-farm',
        prettyName: 'Ali\'s Flower Farm',
        backgroundImage: 'alis_flower_farm_map.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
        width: 1280,
        height: 1040
    },
    "alis-foraging-map": {
        author: 'Mushfae',
        url: 'http://www.nexusmods.com/stardewvalley/mods/1122/',
        name: 'alis-foraging-map',
        prettyName: 'Ali\'s Foraging Map',
        backgroundImage: 'alis_foraging_map.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
        width: 1280,
        height: 1040
    },
    "alis-mountain-map": {
      author: 'Mushfae',
      url: 'http://www.nexusmods.com/stardewvalley/mods/1095/',
      name: 'alis-mountain-map',
      prettyName: 'Ali\'s Mountain Farm',
      backgroundImage: 'alis_mountain_map.jpg',
      restrictionPath: null,
      house: {
        x: 59,
        y: 8
      },
      greenhouse: {
        x: 25,
        y: 6
      },
      width: 1280,
      height: 1040
    },
    "secret-forest": {
        author: 'Mushfae',
        url: 'http://community.playstarbound.com/threads/alis-secret-forest-farm-map-and-buildings.117561/',
        name: 'secret-forest',
        prettyName: 'Secret Forest',
        backgroundImage: 'alis_secret_forest.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    "fancy-farm": {
        author: 'Williambeepbeep',
        url: 'http://www.nexusmods.com/stardewvalley/mods/270/?',
        name: 'fancy-farm',
        prettyName: 'Fancy farm',
        backgroundImage: 'fancy-farm.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1040
    },
    "sv-expansion": {
        author: 'tegobash',
        url: 'http://www.nexusmods.com/stardewvalley/mods/284/?',
        name: 'sv-expansion',
        prettyName: 'Stardew Valley Expansion',
        backgroundImage: 'stardew_valley_expansion.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 1424
    },
    "white-farm": {
        author: 'Meevers',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1293',
        name: 'white-farm',
        prettyName: 'White Water Farm Map',
        backgroundImage: 'white-farm.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
        width: 1280,
        height: 1040
    },
    "immersive-farm-2": {
        author: 'Zander',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1531/',
        name: 'immersive-farm-2',
        prettyName: 'Immersive Farm 2',
        backgroundImage: 'immersive_farm_2.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: null,
        width: 2880,
        height: 1792
    },
    "community-farm": {
        author: 'SgtPickles',
        url: 'https://www.nexusmods.com/stardewvalley/mods/2493',
        name: 'community-farm',
        prettyName: 'Community Farm',
        backgroundImage: 'community_farm.jpg',
        restrictionPath: null,
      house: {
        x: 108,
        y: 20
      },
      greenhouse: {
        x: 60,
        y: 109
      },
      width: 2496,
      height: 2496
    },
    "farm-extended": {
        author: 'Forkmaster',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3496',
        name: 'farm-extended',
        prettyName: 'Farm Extended',
        backgroundImage: 'farm_extended.png',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
        width: 1712,
        height: 1375
    },
    "memory-farm-standard": {
        author: 'Attitude Rains',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703?tab=images',
        name: 'memory-farm-standard',
        prettyName: 'Memory Farm - Standard',
        backgroundImage: 'memory_farm_standard.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
      width: 1280,
      height: 1040
    },
	  "memory-farm-fishing": {
        author: 'Attitude Rains',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703?tab=images',
        name: 'memory-farm-standard',
        prettyName: 'Memory Farm - Fishing',
        backgroundImage: 'memory_farm_fishing.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
      width: 1280,
      height: 1040
    },"memory-farm-foraging": {
        author: 'Attitude Rains',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703?tab=images',
        name: 'memory-farm-standard',
        prettyName: 'Memory Farm - Foraging',
        backgroundImage: 'memory_farm_foraging.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
      width: 1280,
      height: 1040
    },"memory-farm-mining": {
        author: 'Attitude Rains',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703?tab=images',
        name: 'memory-farm-mining',
        prettyName: 'Memory Farm - Mining',
        backgroundImage: 'memory_farm_mining.jpg',
        restrictionPath: null,
        house: {
          x: 59,
          y: 8
        },
        greenhouse: {
          x: 25,
          y: 6
        },
      width: 1280,
      height: 1040
    },
    // inside layouts
    greenhouse: {
        name: 'greenhouse',
        prettyName: 'Greenhouse',
        official: true,
        backgroundImage: 'greenhouse.jpg',
        restrictionPath: [
            'M0,0L1280,0L1280,1040L0,1040',
            'M64,160L256,160L256,320L64,320L64,160z'
        ],
        width: 320,
        height: 384
    }
};
