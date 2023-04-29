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
    beach: {
        name: 'beach',
        backgroundImage: 'farm_beach.jpg',
        official: true,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 14,
            y: 10
        },
        width: 1760,
        height: 1760
    },
    ginger_island: {
        name: 'ginger_island',
        backgroundImage: 'ginger_island.jpg',
        official: true,
        width: 1760,
        height: 1760
    },
    fourcorners: {
        name: 'fourcorners',
        backgroundImage: 'farm_fourcorners.jpg',
        official: true,
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
    quarry: {
        name: 'quarry',
        backgroundImage: 'quarry.png',
        official: true,
        width: 2160,
        height: 656
    },
    "larger-hilltop": {
        name: 'larger-hilltop',
        author: 'Draylon',
        url: 'https://www.nexusmods.com/stardewvalley/mods/6286',
        prettyName: 'Larger Hilltop',
        backgroundImage: 'larger-hilltop.jpg',
        official: false,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 2400,
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
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703',
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
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703',
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
    },
    "memory-farm-foraging": {
        author: 'Attitude Rains',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703',
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
    },
    "memory-farm-mining": {
        author: 'Attitude Rains',
        url: 'https://www.nexusmods.com/stardewvalley/mods/1703',
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
    "capitalist-dream": {
        author: 'DaisyNiko',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3679',
        name: 'capitalist-dream',
        prettyName: 'Capitalist Dream',
        backgroundImage: 'capitalist-dream.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1856,
        height: 1920
    },
    "forest-meadow": {
        author: 'DaisyNiko',
        url: 'https://www.nexusmods.com/stardewvalley/mods/6949',
        name: 'forest-meadow',
        prettyName: 'Forest Meadow',
        backgroundImage: 'forest_meadow.jpg',
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
    "immersive-farm-2-remastered": {
        author: 'FlashShifter',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3753',
        name: 'immersive-farm-2-remastered',
        prettyName: 'Immersive Farm 2 remastered',
        backgroundImage: 'immersive-farm-2-remastered.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 41,
            y: 41
        },
        width: 2608,
        height: 2495
    },
    "immersive-farm-2-remastered-no-static": {
        author: 'FlashShifter',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3753',
        name: 'immersive-farm-2-remastered-no-static',
        prettyName: 'Immersive Farm 2 remastered without static elements',
        backgroundImage: 'immersive-farm-2-remastered-no-static.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 41,
            y: 41
        },
        width: 2608,
        height: 2495
    },
    "bigger-better-hilltop": {
        author: 'XCube591',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3624',
        name: 'bigger-better-hilltop',
        prettyName: 'A Bigger Better Hilltop',
        backgroundImage: 'better_hilltop.jpg',
        restrictionPath: null,
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1680,
        height: 1040
    },
    "neat-farm": {
        author: 'Opalie',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3325',
        name: 'neat-farm',
        prettyName: 'Opalie\'s Neat Farm',
        backgroundImage: 'opalies_neat_farm.jpg',
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
    "bigger-standard-farm": {
        author: 'lillvik',
        url: 'https://www.nexusmods.com/stardewvalley/mods/2443',
        name: 'bigger-standard-farm',
        prettyName: 'lillvik\'s Bigger Standard Farm',
        backgroundImage: 'bigger_standard_farm.jpg',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1280,
        height: 2080
    },
    "capitalist-dream-2": {
        author: 'DaisyNiko',
        url: 'https://www.nexusmods.com/stardewvalley/mods/4572',
        name: 'capitalist-dream-2',
        prettyName: 'DaisyNiko\'s Capitalist Dream 2',
        backgroundImage: 'capitalist_dream_2.jpg',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 2000,
        height: 2496
    },
    "ultimate-farm": {
        author: 'DaisyNiko',
        url: 'https://www.nexusmods.com/stardewvalley/mods/6348',
        name: 'ultimate-farm',
        prettyName: 'DaisyNiko\'s Ultimate Farm',
        backgroundImage: 'ultimate_farm.jpg',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1888,
        height: 1792
    },
    "more-space-forest": {
        author: 'SailorDrew',
        url: 'https://www.nexusmods.com/stardewvalley/mods/2629',
        name: 'more-space-forest',
        prettyName: 'SailorDrew\'s More Space Forest',
        backgroundImage: 'more_space_forest.jpg',
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
    "cherryblossonhh": {
        author: 'Acerbicon',
        url: 'https://www.nexusmods.com/stardewvalley/mods/2711',
        name: 'cherryblossonhh',
        prettyName: 'Ace\'s Cherryblossonhh Farm',
        backgroundImage: 'Cherryblossonhh.png',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 2368,
        height: 2368
    },
    "omni-farm": {
        author: 'lambui',
        url: 'https://github.com/lambui/StardewValleyMod_OmniFarm',
        name: 'omni-farm',
        prettyName: 'Lambui\'s OmniFarm',
        backgroundImage: 'omni_farm.jpg',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1920,
        height: 1920
    },
    "grandpas-farm-sandbox": {
        author: 'FlashShifter',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3753?tab=files',
        name: 'grandpas-farm-sandbox',
        prettyName: 'Grandpa\'s Farm (Sandbox)',
        backgroundImage: 'grandpas_farm_sandbox.jpg',
        house: {
            x: 90,
            y: 42
        },
        greenhouse: {
            x: 18,
            y: 48
        },
        width: 1920,
        height: 1552
    },
    "grandpas-farm": {
        author: 'FlashShifter',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3753?tab=files',
        name: 'grandpas-farm',
        prettyName: 'Grandpa\'s Farm (Standard)',
        backgroundImage: 'grandpas_farm.jpg',
        house: {
            x: 90,
            y: 42
        },
        greenhouse: {
            x: 18,
            y: 48
        },
        width: 1920,
        height: 1552
    },
    "waff": {
        author: 'Archibald_TK',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3753?tab=files',
        name: 'waff',
        prettyName: 'WaFF',
        backgroundImage: 'waff_farm.jpg',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 2000,
        height: 1760
    },
    "waffle": {
        author: 'Archibald_TK',
        url: 'https://www.nexusmods.com/stardewvalley/mods/3753?tab=files',
        name: 'waffle',
        prettyName: 'WaFFLE',
        backgroundImage: 'waffle_farm.jpg',
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 2560,
        height: 1760
    },
    "everfarm": {
        author: 'Draylon',
        url: 'https://www.nexusmods.com/stardewvalley/mods/9347',
        name: 'everfarm',
        prettyName: 'Everfarm',
        backgroundImage: 'everfarm.jpg',
        width: 3200,
        height: 2492
    },
    "hippos-cliffside-falls-farm": {
        author: 'acearohippo',
        url: 'https://www.nexusmods.com/stardewvalley/mods/10379',
        name: 'hippos-cliffside-falls-farm',
        prettyName: 'Hippo\'s Cliffsidde Falls Farm',
        backgroundImage: 'hippos_cliffside_falls.png',
        width: 1280,
        height: 1040
    },
    // inside layouts
    greenhouse: {
        name: 'greenhouse',
        prettyName: 'Greenhouse',
        official: true,
        backgroundImage: 'greenhouse.jpg',
        width: 320,
        height: 384
    },
    "barn": {
        name: 'barn',
        prettyName: 'barn',
        official: true,
        backgroundImage: 'barn.png',
        width: 288,
        height: 240
    },
    "barn-big": {
        name: 'barn-big',
        prettyName: 'Big Barn',
        backgroundImage: 'barn-big.png',
        official: true,
        width: 352,
        height: 240
    },
    "barn-deluxe": {
        name: 'barn-deluxe',
        prettyName: 'Deluxe Barn',
        official: true,
        backgroundImage: 'barn-deluxe.png',
        width: 400,
        height: 240
    },
    "coop": {
        name: 'coop',
        prettyName: 'Coop',
        official: true,
        backgroundImage: 'coop.png',
        width: 192,
        height: 160
    },
    "coop-big": {
        name: 'coop-big',
        prettyName: 'Big Coop',
        official: true,
        backgroundImage: 'coop-big.png',
        width: 256,
        height: 160
    },
    "coop-deluxe": {
        name: 'coop-deluxe',
        prettyName: 'Deluxe Coop',
        official: true,
        backgroundImage: 'coop-deluxe.png',
        width: 368,
        height: 160
    },
    "shed": {
        name: 'shed',
        prettyName: 'Shed',
        official: true,
        backgroundImage: 'shed.png',
        width: 208,
        height: 224
    },
    "shed-big": {
        name: 'shed-big',
        prettyName: 'Big Shed',
        official: true,
        backgroundImage: 'shed-big.png',
        width: 304,
        height: 272
    },
    "slime-hutch": {
        name: 'slime-hutch',
        prettyName: 'Slime Hutch',
        official: true,
        backgroundImage: 'Slimehutchinterior.png',
        width: 309,
        height: 240
    }
};
