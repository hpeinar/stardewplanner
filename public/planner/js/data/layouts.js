/**
 * Layouts represent farm maps.
 * @type {{}}
 */
var layouts = {
    regular: {
        name: 'regular',
        backgroundImage: 'full_background.jpg',
        official: true,
        restrictionPath: [].join(''),
        buildingRestrictionPath: [
          // 'M0,0L640,0L640,128L592,128L592,176L512,176L512,128L160,128L160,144L112,144L112,128L64,128L64,144L48,144L48,368L112,368L112,544L80,544L80,560L64,560L64,576L48,576L48,992L640,992L640,1040L0,1040L0,0z', // top-left
        ].join(''),
        house: {
            x: 59,
            y: 8
        },
        greenhouse: {
            x: 25,
            y: 6
        },
        width: 1010,
        height: 1010
    }
};