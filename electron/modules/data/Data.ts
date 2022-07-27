import { ipcMain } from "electron";
import settings = require("electron-settings");

export default class Data {

    public static initIpc(): void {
        ipcMain.handle("data:get", this.getData);
        ipcMain.handle("data:set", this.setData);
    }

    public static async getSaveData(args) {
        return await settings.get(args);
    }

    public static async setSaveData(key, args) {
        return await settings.set(key, args);
    }

    public static async delSaveData(key) {
        return await settings.unset(key);
    }

    public static async getData(event, args) {
        return await Data.getSaveData(args);
    }

    public static async setData(event, args) {
       Data.setSaveData(args.key, args.value);
    }
}