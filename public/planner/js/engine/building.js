/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

function Building(board, id, x, y, dontPlace, disabled) {
    this.board = board;
    this.R = board.R;
    this.type = id;
    this.typeGroup = id.split('-').pop();
    this.data = data.buildings[id];
    this.placed = false;
    this.disabled = disabled;

    if (!this.data) {
        console.log('Unable to add building, using placeholder ', id);
        id = 'placeholder';
        this.data = data.buildings[id];
    }

    this.sprite = this.R.use(id);

    this.sprite.attr({
        width: this.data.width,
        height: this.data.height,
        'data-custom-type': 'building'
    });

    this.deleted = false;
    this.uuid = Board.generateGUID();

    if (x && y) {
        this.sprite.attr('x', x);
        this.sprite.attr('y', y);
        this.placed = !dontPlace;
    }

    if (!this.disabled) {
        this.drawHighlight();
        this.addEvents();
    }

    if (!this.placed) {
        this.pickUp();
    }
    return this;
}

/**
 * As we are using <use> and it doesn't have return correct BBox, we need our own function
 */
Building.prototype.getBBox = function getBBox() {
    return {
        x: this.sprite.attr('x'),
        y: this.sprite.attr('y'),
        width: this.sprite.attr('width'),
        height: this.sprite.attr('height')
    }
};

Building.prototype.addEvents = function addEvents() {
    this.sprite.hover(this.mouseover, this.mouseout, this, this);
    this.sprite.mousedown(this.mousedown.bind(this));
};


Building.prototype.putDown = function putDown() {
    this.placed = true;
    this.sprite.attr({
        pointerEvents: 'all',
        opacity: 1
    });

    this.hidehighlight();
};

Building.prototype.pickUp = function pickUp() {
    this.placed = false;
    this.sprite.attr({
        // pointerEvents: 'none',
        opacity: .7
    });
};

Building.prototype.drawHighlight = function drawHighlight() {
    if (this.data.highlight) {
        this.highlight = this.R.path(this.data.highlight.path.join(''));
        this.highlight.attr({
            stroke: (this.data.highlight.color || '#006600'),
            strokeWidth: 2,
            opacity: 0,
            fill: (this.data.highlight.color || '#006600'),
            pointerEvents: 'none'
        });
    }
};

Building.prototype.move = function move(pos) {
    this.sprite.attr({
        x: pos.x,
        y: pos.y
    });

    this.moveHighlight();
};

Building.prototype.moveHighlight = function moveHighlight(noFill) {
    if (this.highlight) {
        var highlightX = this.sprite.attr('x') - (this.data.highlight.width / 2 - (this.data.width / 2));
        var highlightY = this.sprite.attr('y') - (this.data.highlight.height / 2 - (this.data.height / 2));
        this.highlight.transform('T'+ highlightX +','+ highlightY);
        this.highlight.attr({
            fill: (noFill ? 'none' : (this.data.highlight.color || '#006600')),
            opacity: .5,
            "fill-opacity": .75
        });
    }
};

Building.prototype.mouseover = function mouseover(e) {
    this.moveHighlight();
};

Building.prototype.mouseout = function mouseout(e) {
    this.hidehighlight();
};

Building.prototype.hidehighlight = function () {
  if (this.highlight) {
    if (this.board.keepHighlights.indexOf(this.typeGroup) === -1) {
      this.highlight.attr({
        opacity: 0,
        fill: 'none'
      });
    }
  }
}

Building.prototype.mousedown = function mouseodwn(e) {
    var building = this;
    if (this.placed) {
        // nasty timeout but is needed to stop clicking issue
        setTimeout(function () {
            if (!building.deleted) {
                building.pickUp();
                building.board.placeBuilding.call(building.board, null, building);
            }
        }, 100)
    }
};

Building.prototype.remove = function remove() {
    this.sprite.remove();
    this.deleted = true;
    if (this.highlight) {
        this.highlight.remove();
    }
};

Building.prototype.convertToData = function convertToData() {
    return {
        type: this.type,
        x: this.sprite.attr('x'),
        y: this.sprite.attr('y')
    }
};
