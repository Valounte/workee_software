import { ipcMain } from "electron";
import Logger from "../../utils/Logger";
import Data from "../data/Data";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default class Login {
    constructor() {
        Logger.Info("Login module loaded");
        this.initIpc();
        
    }
    
    private async setLogin(event, args) {
        await Data.setSaveData("token", args);
        await Data.setSaveData("ready", true);
        return true;
    }

    public initIpc(): void {
        ipcMain.handle("login:set", this.setLogin);
    }

    public getWifiList(): any {
        return [];
    }
}