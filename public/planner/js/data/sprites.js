/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

var data = {
    tiles: [
        'grass',
        'farmland',
        'weeds',
        'trellis',
        'tulips',
        'fence',
        'wood-fence',
        'stone-fence',
        'iron-fence',
        'hardwood-fence',
        'torch-fence',
        'torch-wood-fence',
        'torch-stone-fence',
        'torch-iron-fence',
        'torch-hardwood-fence',
        'road',
        'wood-path',
        'steppingstone-path',
        'crystal-path',
        'gravel-path',
        'wood-floor',
        'brick-floor',
        'straw-floor',
        'weathered-floor',
        'rustic-plank-floor',
        'stone-walkway',
        'stone-floor',
        'crystal-floor',
        'tree',
        'stone',
        'twig',
        'tapper',
        'hoedirt', // also known as farmland
		'blue-jazz',
		'cauliflower',
		'garlic',
		'green-bean',
		'kale',
		'parsnip',
		'potato',
		'rhubarb',
		'strawberry',
		'tulip',
		'blueberry',
		'hops',
		'hot-pepper',
		'melon',
		'poppy',
		'radish',
		'red-cabbage',
		'starfruit',
		'summer-spangle',
		'tomato',
		'wheat',
		'amaranth',
		'ancient-fruit',
		'artichoke',
		'beet',
		'bok-choy',
		'corn',
		'cranberry',
		'eggplant',
		'fairy-rose',
		'grape',
		'pumpkin',
		'sunflower',
		'yam',
    'rice',
    'coffee-bean',
    'tea',
    'sweet-gem-berry',
    ],
    buildings: {
        "well": {
            "sprite": "./img/tiles/well.png",
            "width": 3*16,
            "height": 3*16
        },
        "silo": {
            "sprite": "./img/tiles/silo.png",
            "width": 3*16,
            "height": 3*16
        },
        "barn": {
            "sprite": "./img/tiles/barn.png",
            "width": 7*16,
            "height": 4*16
        },
        "big-barn": {
            "sprite": "./img/tiles/big-barn.png",
            "width": 7*16,
            "height": 4*16
        },
        "placeholder": {
            "sprite": "./img/tiles/placeholder.png",
            "width": 16,
            "height": 16
        },
        "meteorite": {
            "sprite": "./img/tiles/meteorite.png",
            "width": 32,
            "height": 32
        },
        "coop": {
            "sprite": "./img/tiles/coop.png",
            "width": 6*16,
            "height": 3*16
        },
        "stable": {
            "sprite": "./img/tiles/stable.png",
            "width": 4*16,
            "height": 2*16
        },
        "fish-pond": {
            "sprite": "./img/tiles/fish-pond.png",
            "width": 5*16,
            "height": 5*16
        },
        "sprinkler": {
            "sprite": "./img/tiles/sprinkler.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,16", "L16, 16", "L16,0", "L32,0", "L32,16", "L48,16", "L48,32", "L32,32", "L32,48", "L16,48", "L16,32", "L0,32", "L0,16", "z"],
                "width": 48,
                "height": 48
            }
        },
        "pressured-sprinkler": {
            "sprite": "./img/tiles/sprinkler-pressured.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,0", "L0,48", "L48,48", "L48,0", "z"],
                "width": 48,
                "height": 48
            }
        },
        "q-sprinkler": {
            "sprite": "./img/tiles/q-sprinkler.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,0", "L0,48", "L48,48", "L48,0", "z"],
                "width": 48,
                "height": 48
            }
        },
        "q-pressured-sprinkler": {
            "sprite": "./img/tiles/q-sprinkler-pressured.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,0", "L0,80", "L80,80", "L80,0", "z"],
                "width": 80,
                "height": 80
            }
        },
        "irid-sprinkler": {
            "sprite": "./img/tiles/irid-sprinkler.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,0", "L0,80", "L80,80", "L80,0", "z"],
                "width": 80,
                "height": 80
            }
        },
        "irid-pressured-sprinkler": {
            "sprite": "./img/tiles/irid-sprinkler-pressured.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,0", "L0,112", "L112,112", "L112,0", "z"],
                "width": 112,
                "height": 112
            }
        },
        "scarecrow": {
            "sprite": "./img/tiles/scarecrow.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,64", "L16,64", "L16,48", "L32,48", "L32,32", "L48,32", "L48,16", "L64,16", "L64,0", "L208,0",
                    "L208,16", "L224,16", "L224,32", "L240,32", "L240,48", "L256,48", "L256,64", "L272,64", "L272,208",
                    "L256,208", "L256,224", "L240,224", "L240,240", "L224,240", "L224,256", "L208,256", "L208,272", "L64,272",
                    "L64,256", "L48,256", "L48,240", "L32,240", "L32,224", "L16,224", "L16,208", "L0,208",
                    "z"],
                "width": 272,
                "height": 272,
                "color": "rgba(9,255,54,0.71)"
            }
        },
        "deluxe-scarecrow": {
            "sprite": "./img/tiles/deluxe-scarecrow.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,352", "L0,176", "L16,176", "L16,144", "L32,144", "L32,112", "L48,112", "L48,96", "L64,96", "L64,64", "L96,64", "L96,48", "L112,48", "L112,32", "L144,32", "L144,16", "L176,16", "L176,0", "L352,0", "L352,16", "L384,16", "L384,32", "L416,32", "L416,48", "L432,48", "L432,64", "L464,64", "L464,96", "L480,96", "L480,112", "L496,112", "L496,144", "L512,144", "L512,176", "L528,176", "L528,352", "L512,352", "L512,384", "L496,384", "L496,416", "L480,416", "L480,432", "L464,432", "L464,464", "L432,464", "L432,480", "L416,480", "L416,496", "L384,496", "L384,512", "L352,512", "L352,528", "L176,528", "L176,512", "L144,512", "L144,496", "L112,496", "L112,480", "L96,480", "L96,464", "L64,464", "L64,432", "L48,432", "L48,416", "L32,416", "L32,384", "L16,384", "L16,352", "L0,352", "z"],
                "width": 528,
                "height": 528,
                "color": "rgba(9,255,54,0.71)"
            }
        },
        "chest": {
            "sprite": "./img/tiles/chest.png",
            "width": 16,
            "height": 16
        },
        "wood-sign": {
            "sprite": "./img/tiles/wood-sign.png",
            "width": 16,
            "height": 16
        },
        "stone-sign": {
            "sprite": "./img/tiles/stone-sign.png",
            "width": 16,
            "height": 16
        },
        "furnace": {
            "sprite": "./img/tiles/furnace.png",
            "width": 16,
            "height": 16
        },
        "mayo": {
            "sprite": "./img/tiles/mayo.png",
            "width": 16,
            "height": 16
        },
        "mayonnaise-machine": {
            "sprite": "./img/tiles/mayo.png",
            "width": 16,
            "height": 16
        },
        "cheese-press": {
            "sprite": "./img/tiles/cheese-press.png",
            "width": 16,
            "height": 16
        },
        "keg": {
            "sprite": "./img/tiles/keg.png",
            "width": 16,
            "height": 16
        },
        "loom": {
            "sprite": "./img/tiles/loom.png",
            "width": 16,
            "height": 16
        },
        "preserves": {
            "sprite": "./img/tiles/preserves.png",
            "width": 16,
            "height": 16
        },
        "preserves-jar": {
            "sprite": "./img/tiles/preserves.png",
            "width": 16,
            "height": 16
        },
        "oil-maker": {
            "sprite": "./img/tiles/oil-maker.png",
            "width": 16,
            "height": 16
        },
        "charcoal": {
            "sprite": "./img/tiles/charcoal.png",
            "width": 16,
            "height": 16
        },
        "charcoal-kiln": {
            "sprite": "./img/tiles/charcoal.png",
            "width": 16,
            "height": 16
        },
        "crystalarium": {
            "sprite": "./img/tiles/crystal.png",
            "width": 16,
            "height": 16
        },
        "crystal": {
            "sprite": "./img/tiles/crystal.png",
            "width": 16,
            "height": 16
        },
        "egg-press": {
            "sprite": "./img/tiles/egg-press.png",
            "width": 16,
            "height": 16
        },
        "slime-egg-press": {
            "sprite": "./img/tiles/egg-press.png",
            "width": 16,
            "height": 16
        },
        "statue-of-endless-fortune": {
            "sprite": "./img/tiles/statue-of-endless-fortune.png",
            "width": 16,
            "height": 16
        },
        "lightning-rod": {
            "sprite": "./img/tiles/lighting-rod.png",
            "width": 16,
            "height": 16
        },
        "lighting-rod": {
            "sprite": "./img/tiles/lighting-rod.png",
            "width": 16,
            "height": 16
        },
        "recycling-machine": {
            "sprite": "./img/tiles/recycling-machine.png",
            "width": 16,
            "height": 16
        },
        "seed-maker": {
            "sprite": "./img/tiles/seed-maker.png",
            "width": 16,
            "height": 16
        },
        "slime-incubator": {
            "sprite": "./img/tiles/slime-incubator.png",
            "width": 16,
            "height": 16
        },
        "worm-bin": {
            "sprite": "./img/tiles/worm-bin.png",
            "width": 16,
            "height": 16
        },
        "wood-chipper": {
            "sprite": "./img/tiles/wood-chipper.png",
            "width": 16,
            "height": 16
        },
        "workbench": {
            "sprite": "./img/tiles/workbench.png",
            "width": 16,
            "height": 16
        },
        "mini-jukebox": {
            "sprite": "./img/tiles/mini-jukebox.png",
            "width": 16,
            "height": 16
        },
        "cherry-tree": {
            "sprite": "./img/tiles/cherry-tree.png",
            "width": 48,
            "height": 48
        },
        "orange-tree": {
            "sprite": "img/tiles/orange-tree.png",
            "width": 48,
            "height": 48
        },
        "oak-tree": {
            "sprite": "img/tiles/oak-tree.png",
            "width": 48,
            "height": 48
        },
        "maple-tree": {
            "sprite": "img/tiles/maple-tree.png",
            "width": 48,
            "height": 48
        },
        "pine-tree": {
            "sprite": "img/tiles/pine-tree.png",
            "width": 48,
            "height": 48
        },
        "mushroom-tree": {
            "sprite": "img/tiles/mushroom-tree.png",
            "width": 48,
            "height": 48
        },
        "banana-tree": {
            "sprite": "img/tiles/banana-tree.png",
            "width": 48,
            "height": 48
        },
        "mahogany-tree": {
            "sprite": "img/tiles/mahogany-tree.png",
            "width": 48,
            "height": 48
        },
        "mango-tree": {
            "sprite": "img/tiles/mango-tree.png",
            "width": 48,
            "height": 48
        },
        "apple": {
            "sprite": "img/tiles/apple.png",
            "width": 48,
            "height": 48
        },
        "apricot": {
            "sprite": "img/tiles/apricot.png",
            "width": 48,
            "height": 48
        },
        "peach": {
            "sprite": "img/tiles/peach.png",
            "width": 48,
            "height": 48
        },
        "pomegranate": {
            "sprite": "img/tiles/pomegranate.png",
            "width": 48,
            "height": 48
        },
        "giant-cauliflower": {
            "sprite": "img/tiles/giant-cauliflower.png",
            "width": 48,
            "height": 48
        },
        "giant-melon": {
            "sprite": "img/tiles/giant-melon.png",
            "width": 48,
            "height": 48
        },
        "giant-pumpkin": {
            "sprite": "img/tiles/giant-pumpkin.png",
            "width": 48,
            "height": 48
        },
        "slime-hutch": {
            "sprite": "./img/tiles/slime-hutch.png",
            "width": 176,
            "height": 96
        },
        "gate": {
            "sprite": "./img/tiles/gate.png",
            "width": 16,
            "height": 16
        },
        "auto-petter": {
            "sprite": "./img/tiles/auto-petter.png",
            "width": 16,
            "height": 16
        },
        "bone-mill": {
            "sprite": "./img/tiles/bone-mill.png",
            "width": 16,
            "height": 16
        },
        "dark-sign": {
            "sprite": "./img/tiles/dark-sign.png",
            "width": 16,
            "height": 16
        },
        "farm-computer": {
            "sprite": "./img/tiles/farm-computer.png",
            "width": 16,
            "height": 16
        },
        "geode-crusher": {
            "sprite": "./img/tiles/geode-crusher.png",
            "width": 16,
            "height": 16
        },
        "heavy-tapper": {
            "sprite": "./img/tiles/heavy-tapper.png",
            "width": 16,
            "height": 16
        },
        "mini-shipping-bin": {
            "sprite": "./img/tiles/mini-shipping-bin.png",
            "width": 16,
            "height": 16
        },
        "mini-obelisk": {
            "sprite": "./img/tiles/mini-obelisk.png",
            "width": 16,
            "height": 16
        },
        "solar-panel": {
            "sprite": "./img/tiles/solar-panel.png",
            "width": 16,
            "height": 16
        },
        "stone-chest": {
            "sprite": "./img/tiles/stone-chest.png",
            "width": 16,
            "height": 16
        },
        "bee-hive": {
            "sprite": "./img/tiles/bee-hive.png",
            "width": 16,
            "height": 16,
            "highlight": {
                "path": ["M0,80","L16,80","L16,64","L32,64","L32,48","L48,48","L48,32","L64,32","L64,16","L80,16","L80,0","L96,0","L96,16","L112,16","L112,32","L128,32","L128,48","L144,48","L144,64","L160,64","L160,80","L176,80","L176,96","L160,96","L160,112","L144,112","L144,128","L128,128","L128,144","L112,144","L112,160","L96,160","L96,176","L80,176","L80,160","L64,160","L64,144","L48,144","L48,128","L32,128","L32,112","L16,112","L16,96","L0,96","L0,80","z"],
                "width": 176,
                "height": 176,
                "color": "rgba(255,244,68,0.8)"
            }
        },
        "torch": {
            "sprite": "./img/tiles/torch.png",
            "width": 16,
            "height": 16
        },
        "campfire": {
            "sprite": "./img/tiles/campfire.png",
            "width": 16,
            "height": 16
        },
        "wooden-brazier": {
            "sprite": "./img/tiles/wooden-brazier.png",
            "width": 16,
            "height": 16
        },
        "stone-brazier": {
            "sprite": "./img/tiles/stone-brazier.png",
            "width": 16,
            "height": 16
        },
        "gold-brazier": {
            "sprite": "./img/tiles/gold-brazier.png",
            "width": 16,
            "height": 16
        },
        "carved-brazier": {
            "sprite": "./img/tiles/carved-brazier.png",
            "width": 16,
            "height": 16
        },
        "stump-brazier": {
            "sprite": "./img/tiles/stump-brazier.png",
            "width": 16,
            "height": 16
        },
        "barrel-brazier": {
            "sprite": "./img/tiles/barrel-brazier.png",
            "width": 16,
            "height": 16
        },
        "skull-brazier": {
            "sprite": "./img/tiles/skull-brazier.png",
            "width": 16,
            "height": 16
        },
        "marble-brazier": {
            "sprite": "./img/tiles/marble-brazier.png",
            "width": 16,
            "height": 16
        },
        "wood-lamp-post": {
            "sprite": "./img/tiles/wood-lamp-post.png",
            "width": 16,
            "height": 16
        },
        "iron-lamp-post": {
            "sprite": "./img/tiles/iron-lamp-post.png",
            "width": 16,
            "height": 16
        },
        'large-log': {
            "sprite": "./img/tiles/large-log.png",
            "width": 32,
            "height": 32
        },
        'large-rock': {
            "sprite": "./img/tiles/large-rock.png",
            "width": 32,
            "height": 32
        },
        'large-stump': {
            "sprite": "./img/tiles/large-stump.png",
            "width": 32,
            "height": 32
        },
        'house': {
            "width": 144,
            "height": 144,
            "sprite": "./img/tiles/house.png"
        },
        'greenhouse': {
            "width": 112,
            "height": 160,
            "sprite": "./img/tiles/greenhouse-broken.png"
        },
        'greenhouse-fixed': {
            "width": 112,
            "height": 160,
            "sprite": "./img/tiles/greenhouse-fixed.png"
        },
        'earth-obelisk': {
            "width": 3*16,
            "height": 2*16,
            "sprite": "./img/tiles/earth-obelisk.png"
        },
        'water-obelisk': {
            "width": 3*16,
            "height": 2*16,
            "sprite": "./img/tiles/water-obelisk.png"
        },
        'desert-obelisk': {
            "width": 3*16,
            "height": 2*16,
            "sprite": "./img/tiles/desert-obelisk.png"
        },
        'island-obelisk': {
            "width": 3*16,
            "height": 2*16,
            "sprite": "./img/tiles/island-obelisk.png"
        },
        'gold-clock': {
            "width": 3*16,
            "height": 2*16,
            "sprite": "./img/tiles/gold-clock.png"
        },
        'mill': {
            "width": 4*16,
            "height": 2*16,
            "sprite": "./img/tiles/mill.png"
        },
        'junimo-hut': {
            "width": 3*16,
            "height": 2*16,
            "sprite": "./img/tiles/junimo-hut.png",
            "highlight": {
                "path": ["M0,0", "L272,0", "L272,272", "L0,272", "z"],
                "width": 272,
                "height": 256,
                "color": "#89CFF0"
            }
        },
        'shed': {
            "width": 7*16,
            "height": 3*16,
            "sprite": "./img/tiles/shed.png"
        },
        'object-restriction': {
            "width": 16,
            "height": 16,
            "sprite": "./img/tiles/object-restriction.png"
        },
        'building-restriction': {
            "width": 16,
            "height": 16,
            "sprite": "./img/tiles/building-restriction.png"
        },
        "stone-cabin": {
            "width": 5*16,
            "height": 3*16,
            "sprite": "./img/tiles/stone-cabin.png"
        },
        "plank-cabin": {
            "width": 5*16,
            "height": 3*16,
            "sprite": "./img/tiles/plank-cabin.png"
        },
        "log-cabin": {
            "width": 5*16,
            "height": 3*16,
            "sprite": "./img/tiles/log-cabin.png"
        },
        "shipping-bin": {
            "width": 2*16,
            "height": 16,
            "sprite": "./img/tiles/shipping-bin.png"
        }
    }
};

// nodeJS would also like to use this file
if (typeof module !== 'undefined') {
    module.exports = data;
}
