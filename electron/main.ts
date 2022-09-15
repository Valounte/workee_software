import { app, BrowserWindow, protocol } from 'electron';

import path = require("path");
import url = require("url");
import isDev = require('electron-is-dev');
import Logger from './utils/Logger';
import WiFi from './modules/wifi/WiFi';
import Data from './modules/data/Data';
import { Config } from './config';
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

    private static launch() {
        Logger.init();
        Logger.Info("Appli launched");
        let wifi = new WiFi();
        Data.initIpc();
    }

    private static onReady() {
        Main.launch();
        this.win = new Main.BrowserWindow({
            width: 800,
            height: 480,
            fullscreen: !isDev,
            title: "Workee",
            frame: !isDev,
            webPreferences: {
                devTools: isDev,
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
            (Config.urlApp) ? Config.urlApp : "http://localhost:3000";
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