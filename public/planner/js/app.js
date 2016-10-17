'use strict';

let {clipboard} = require('electron');
let {dialog} = require('electron').remote;

// let bookmark = clipboard.readBookmark();

if (bookmark.url && navigator.onLine) {
    // dialog.showMessageBox({
    //     type: 'question',
    //     buttons: ['OK', 'Cancel'],
    //     title: 'Plan detected on clipboard',
    //     message: 'You seem to have plan URL copied to clipboard, would you like to load it in the app?'
    // }, function (button) {
    //     // user pressed OK, load the save
    //     if (button === 0) {
    //         // TODO: Load save
    //     }
    // });
}
