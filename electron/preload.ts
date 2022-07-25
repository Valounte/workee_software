// All of the Node.js APIs are available in the preload process.

import { ipcRenderer } from "electron";

// It has the same sandbox as a Chrome extension.
const { contextBridge } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
    contextBridge.exposeInMainWorld("versions", process.versions);
    contextBridge.exposeInMainWorld('api',{
        getWifi: () => ipcRenderer.invoke('wifi:get'),
        connectWifi: (args) => ipcRenderer.invoke('wifi:connect', args)
    });
});