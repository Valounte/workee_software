import { ipcMain } from "electron";
import Command from "../../utils/Command";
import Logger from "../../utils/Logger";
import isDev = require('electron-is-dev');
import Data from "../data/Data";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default class WiFi {
    constructor() {
        Logger.Info("Wifi module loaded");
        this.initIpc();
        
    }

    private async getWifi() {
        let wifiAvailableList = [];
        var wifiscan = (isDev) ? `bssid / frequency / signal level / flags / ssid
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman`: await Command.execute("wpa_cli -i wlan0 scan") ;
        
        
        wifiscan = wifiscan.replace(/\t/g, " ");
        var listwifi = wifiscan.split("\n");

        for (let i = 1; i < listwifi.length; i++) {
            let wifi = listwifi[i];
            let wifiinfo = wifi.split(" ");
            let wifiobj = {
                ssid: wifiinfo[4],
                bssid: wifiinfo[0],
                frequency: wifiinfo[1],
                signal: wifiinfo[2],
                flags: "WPA2",
            }
            wifiAvailableList.push(wifiobj);
        }
        await timeout(1000);
        return wifiAvailableList;
    }

    public async connectWifi(event, args) {
        await timeout(5000);
        if (args.ssid && args.password === "Test1234") {
            await Data.setSaveData("wifi", args);
            await Data.setSaveData("ready", true);
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