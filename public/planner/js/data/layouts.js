/**
 * Layouts represent farm maps.
 * @type {{}}
 */
var layouts = {
    regular: {
        name: 'regular',
        backgroundImage: 'full_background.jpg',
        official: true,
        restrictionPath: [
            'M0,0L640,0L640,128L560,128L560,96L544,96L544,128L64,128L64,144L48,144L48,368L112,368L112,544L80,544L80,560L64,560L64,576L48,576L48,992L640,992L640,1040L0,1040z', // left side
            'M672,0L672,128L736,128L736,112L768,112L768,128L784,128L784,112L848,112L848,144L880,144L880,160L1200,160L1200,176L1232,176L1232,160L1248,160L1248,176L1232,176L1232,192L1248,192L1248,240L1280,240L1280,0z', // top right
            'M1232,304L1232,896L1168,896L1168,944L1104,944L1104,992L672,992L672,1040L1280,1040L1280,304z', // bottom right
            'M400,160L512,160L512,256L400,256z', // greenhouse
            'M944,176L1088,176L1088,256L1104,256L1104,272L944,272z', // house
            'M1136,224L1168,224L1168,240L1136,240z', // ship box
            'M1120,448L1200,448L1200,464L1216,464L1216,528L1200,528L1200,544L1136,544L1136,528L1120,528L1120,448z', // little pond
            'M576,784L688,784L688,800L704,800L704,816L736,816L736,832L752,832L752,896L736,896L736,912L720,912L720,928L672,928L672,944L592,944L592,928L576,928L576,912L544,912L544,880L528,880L528,832L544,832L544,816L560,816L560,800L576,800L576,784z' // big pond
        ].join(''),
        house: {
            x: 58,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        }
    },
    combat: {
        name: 'combat',
        backgroundImage: 'farm_combat.jpg',
        official: true,
        restrictionPath: [
            'M0,0L640,0L640,128L560,128L352,128L352,144L320,144L320,160L224,160L224,144L192,144L192,128L64,128L64,144L48,144L48,272L64,272L64,288L80,288L80,304L96,304L96,320L112,320L112,336L160,336L160,352L256,352L256,368L304,368L304,384L352,384L352,400L384,400L384,544L352,544L352,560L320,560L320,576L224,576L224,560L192,560L192,544L80,544L80,560L64,560L64,576L48,576L48,672L0,672z', // left side area
            'M672,0L672,128L736,128L736,112L768,112L768,128L784,128L784,112L848,112L848,144L880,144L880,160L1184,160L1184,176L1216,176L1216,160L1248,160L1248,176L1232,176L1232,192L1248,192L1248,240L1280,240L1280,0z', //right-top area
            'M944,176,L1088,176,L1088,272,L944,272,L944,176z', // house
            'M400,160,L512,160,L512,256,L400,256,L400,160z', // greenhouse
            'M672,992,L816,992,L816,912,L992,912,L992,896,L1024,896,L1024,880,L1120,880,L1120,672,L1152,672,L1152,656,L1184,656,L1184,320,L1216,320,L1216,304,L1280,304,L1280,1040,L672,1040z', // left down
            'M0,672,L144,672,L144,688,L256,688,L256,704,L320,704,L320,720,L368,720,L368,736,L400,736,L400,752,L416,752,L416,768,L432,768,L432,800,L448,800,L448,880,L464,880,L464,992,L640,992,L640,1040,L16,1040,L0,1040,L0,672z', // right-down
            'M704,384,L816,384,L816,400,L832,400,L832,416,L864,416,L864,432,L880,432,L880,464,L896,464,L896,480,L928,480,L928,560,L880,560,L880,576,L880,592,L864,592,L864,608,L848,608,L848,624,L800,624,L800,640,L720,640,L720,624,L704,624,L704,608,L672,608,L672,592,L656,592,L656,576,L640,576,L640,560,L624,560,L624,464,L656,464,L656,432,L672,432,L672,416,L688,416,L688,400,L704,400,L704,384z' // middle lake
        ].join(''),
        house: {
            x: 58,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        }
    },
    fishing: {
        name: 'fishing',
        backgroundImage: 'farm_fishing.jpg',
        official: true,
        backgroundImageGreenhouse: null,
        restrictionPath: null,
        house: {
            x: 58,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        }
    },
    foraging: {
        name: 'foraging',
        backgroundImage: 'farm_foraging.jpg',
        official: true,
        restrictionPath: null,
        house: {
            x: 58,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        }
    },
    mining: {
        name: 'mining',
        backgroundImage: 'farm_mining.jpg',
        official: true,
        restrictionPath: null,
        house: {
            x: 58,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        }
    },
    "wonderful-farm-life": {
        author: 'taintedwheat & JinxieWinxie',
        url: 'http://community.playstarbound.com/threads/wonderful-farm-life-smapi-version-updated-7-2-now-with-grandpas-memorial-make-your-farm-sick.115384/',
        name: 'wonderful-farm-life',
        prettyName: 'WonderfulFarmLife',
        backgroundImage: 'wonderful-farm-life.jpg',
        restrictionPath: null,
        house: {
            x: 58,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        }
    }
};