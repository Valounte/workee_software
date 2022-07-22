import { app, BrowserWindow, protocol, ipcMain } from 'electron';

import path = require("path");
import url = require("url");
import isDev = require('electron-is-dev');
// import { Init } from './init';

export default class Main {
    static win: Electron.BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow: any;
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        Main.win = null;
    }

    private static onReady() {
        this.win = new Main.BrowserWindow({
            width: 640,
            height: 480,
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, "preload.js"),
            }
        })
    
        const appURL = app.isPackaged ?
            url.format({
                pathname: path.join(__dirname, "../index.html"),
                protocol: "file:",
                slashes: true,
            }) :
            "http://localhost:3000";
        if (this.win) {
            this.win.loadURL(appURL);
        }
        
        // Automatically open Chrome's DevTools in development mode.
        if (!app.isPackaged) {
        }
        protocol.registerHttpProtocol(
            "file",
            (request, callback) => {
                const url = request.url.substr(8);
                callback({ path: path.normalize(`${__dirname}/${url}`) });
            }
        );
    }


    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}

Main.main(app, BrowserWindow);