import { ipcMain } from "electron";
import Logger from "../../utils/Logger";

export default class WiFi {
    constructor() {
        Logger.Info("Wifi module loaded");
        this.initIpc();
    }

    async getWifi() {
        return ([{
            ssid: "BrangersTV",
            signal_strength: -50,
            security: "WPA2"
        },
        {
            ssid: "BrangersTV2",
            signal_strength: -50,
            security: "WPA2"
        }]);
      }


    public initIpc(): void {
        ipcMain.handle("wifi:get", this.getWifi);
    }

    public getWifiList(): any {
        return [];
    }
}