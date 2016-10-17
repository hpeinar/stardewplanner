'use strict';

const {app, BrowserWindow, dialog} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let closeAgreed = false;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 1024,
        title: 'Stardew Valley planner',
    });

    // and load the index.html of the app.
    if (process.env.NODE_ENV == 'development') {
        // in dev the files are in another location
        win.loadURL(`file://${__dirname}/../public/planner/app.html`);
    } else {
        win.loadURL(`file://${__dirname}/public/planner/app.html`);
    }

    // Open the DevTools.
    win.webContents.openDevTools();


    win.on('close', function(e) { //   <---- Catch close event
        console.log('closing');
        // The dialog box below will open, instead of your app closing.
        if (!closeAgreed) {
            e.preventDefault();

            dialog.showMessageBox({
                message: 'Are you sure you want to quit? You\'ll lose all unsaved progress',
                buttons: ['Quit', 'Don\'t quit']
            }, function (button) {
                console.log('Button pressed', button);
                if (button === 0) {
                    closeAgreed = true;
                    win.close();
                }
            });
        }
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});