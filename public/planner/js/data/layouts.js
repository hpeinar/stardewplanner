/**
 * Layouts represent farm maps.
 * @type {{}}
 */
var layouts = {
    regular: {
        name: 'regular',
        backgroundImage: 'full_background.jpg',
        backgroundImageGreenhouse: null,
        restrictionPath: [
            'M0,0L640,0L640,128L560,128L560,96L544,96L544,128L64,128L64,144L48,144L48,368L112,368L112,544L80,544L80,560L64,560L64,576L48,576L48,992L640,992L640,1040L0,1040z', // left side
            'M672,0L672,128L736,128L736,112L768,112L768,128L784,128L784,112L848,112L848,144L880,144L880,160L1200,160L1200,176L1232,176L1232,160L1248,160L1248,176L1232,176L1232,192L1248,192L1248,240L1280,240L1280,0z', // top right
            'M1232,304L1232,896L1168,896L1168,944L1104,944L1104,992L672,992L672,1040L1280,1040L1280,304z', // bottom right
            'M400,160L512,160L512,256L400,256z', // greenhouse
            'M944,176L1088,176L1088,256L1104,256L1104,272L944,272z', // house
            'M1136,224L1168,224L1168,240L1136,240z', // ship box
            'M1120,448L1200,448L1200,464L1216,464L1216,528L1200,528L1200,544L1136,544L1136,528L1120,528L1120,448z', // little pond
            'M576,784L688,784L688,800L704,800L704,816L736,816L736,832L752,832L752,896L736,896L736,912L720,912L720,928L672,928L672,944L592,944L592,928L576,928L576,912L544,912L544,880L528,880L528,832L544,832L544,816L560,816L560,800L576,800L576,784z' // big pond
        ].join('')
    },
    combat: {
        name: 'combat',
        backgroundImage: 'farm_combat.jpg',
        backgroundImageGreenhouse: null,
        restrictionPath: null
    },
    fishing: {
        name: 'fishing',
        backgroundImage: 'farm_fishing.jpg',
        backgroundImageGreenhouse: null,
        restrictionPath: null
    },
    foraging: {
        name: 'foraging',
        backgroundImage: 'farm_foraging.jpg',
        backgroundImageGreenhouse: null,
        restrictionPath: null
    },
    mining: {
        name: 'mining',
        backgroundImage: 'farm_mining.jpg',
        backgroundImageGreenhouse: null,
        restrictionPath: null
    }
};