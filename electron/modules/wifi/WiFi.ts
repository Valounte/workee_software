import { ipcMain } from "electron";
import Logger from "../../utils/Logger";

export default class WiFi {
    constructor() {
        Logger.Info("Wifi module loaded");
        this.initIpc();
    }
    
    private async getWifi() {


        if (true) {
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
    }

    public connectWifi(event, args) {
        if (args.ssid && args.password === "Test1234") {
            return true;
        } else {
            return false;
        }
    }

    public initIpc(): void {
        ipcMain.handle("wifi:get", this.getWifi);
        ipcMain.handle("wifi:connect", this.connectWifi);
    }

    public getWifiList(): any {
        return [];
    }
}