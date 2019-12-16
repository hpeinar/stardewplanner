/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

function Brush(board) {
    this.board = board;
    this.R = board.R;
    this.rect = this.R.rect(0, 0, 16, 16);

    this.locked = false;
    this.rect.attr({
        fill: 'white',
        opacity: .4,
        pointerEvents: 'none'
    });

    this.oldType = null;
    this.oldRestriction = null;
    this.erase = false;
    this.freemode = false;
    this.overwriting = false;
    this.type = null;
    this.restriction = 'tillable';
    // create fill pattern for the bursh we can use to "ghost" the brush
    this.fillImage = this.R.image(Board.toFullPath('img/tiles/'+ this.type +'.png'), 0 , 0, 16, 16);
    this.fillGrid = this.fillImage.toPattern(0, 0, 16, 16);
    this.fillGrid.attr({
        id: 'brushFill'
    });

    // default to road brush
    this.changeBrush('road','accessible');

    return this;
}

/**
 * Changes brush type to new
 * @param newType
 * @param restriction
 */
Brush.prototype.changeBrush = function changeBrush(newType, restriction) {
    this.oldType = this.type;

    if (restriction) {
        this.restriction = restriction;
    } else {
        this.restriction = 'tillable';
    }

    this.oldRestriction = this.restriction;

    if (newType === 'eraser') {
        this.rect.attr({
            fill: 'red'
        });
        this.type = null;
        this.erase = true;
        return;
    }

    if (newType === 'select') {
        this.type = null;
        this.erase = false;
        this.rect.attr({
            fill: 'none'
        });
        return;
    }

    this.fillImage.attr({
        href: Board.toFullPath('img/tiles/'+ newType +'.png')
    });

    // switch brush fill to pattern
    this.rect.attr({
        fill: 'url(#brushFill)'
    });

    this.erase = false;
    this.type = newType;
};

/**
 * Restores brush to stored, oldType
 */
Brush.prototype.restoreBrush = function restoreBrush() {
    this.changeBrush(this.oldType, this.oldRestriction);
};

/**
 * Locks brush, so the rect will stay in it's current position
 */
Brush.prototype.lock = function lock() {
    // lock the brush and remember lockX/Y
    this.locked = true;
    this.lockX = this.rect.attr('x');
    this.lockY = this.rect.attr('y');
};

/**
 * Unlocks the brush so it can be moved again
 */
Brush.prototype.unlock = function unlock() {
    // turn lock off
    this.locked = false;
};


/**
 * Moves the brush to the given location if it's not locked
 * @param pos
 */
Brush.prototype.move = function move(pos) {
    if (this.locked) {
        return;
    }

    if (this.board.restrictionCheck && !this.board.placingBuilding && this.type !== 'select' && this.type !== 'eraser' && this.type) {
        this.checkRestriction();
    }

    this.rect.attr({
        x: pos.x,
        y: pos.y
    });

};

Brush.prototype.checkRestriction = function checkRestriction() {
    if (this.board.checkPathRestriction(this.board.restrictionMap.tillable, this.rect)) {
        this.rect.attr({
            stroke: 'red',
            strokeDasharray: '5,5'
        });
    } else {
        this.rect.attr({
            stroke: 'none'
        });
    }
};

/**
 * Drags brush bigger
 * @param pos
 */
Brush.prototype.drag = function drag(pos) {
    var currentX = this.lockX;
    var currentY = this.lockY;

    var newWidth = pos.x - currentX;
    var newHeight = pos.y - currentY;

    // if width is below zero, we need to move the rect
    // as negative width will not be drawn
    if (newWidth < 0) {
        var moveX = currentX - pos.x;
        this.rect.attr({
            x: currentX - moveX
        });

        // calc new width for the rect. +tileSize is because the location is top left corner but the tile should be filled
        newWidth = this.lockX - this.rect.attr('x');
    } else {
        this.rect.attr({
            x: this.lockX
        })
    }

    // if height is below zero, we need to move the rect
    // as negative height will not be drawn
    if (newHeight < 0) {
        var moveY = currentY - pos.y;
        this.rect.attr({
            y: currentY - moveY
        });

        newHeight = this.lockY - this.rect.attr('y');
    } else {
        this.rect.attr({
            y: this.lockY
        })
    }


    this.rect.attr({
        width: newWidth + this.board.tileSize,
        height: newHeight + this.board.tileSize
    });

    if (this.board.restrictionCheck) {
        this.checkRestriction();
    }
};

/**
 * Resets brush height / width
 */
Brush.prototype.reset = function reset() {
    this.rect.attr({
        width: 16,
        height: 16
    });
};

