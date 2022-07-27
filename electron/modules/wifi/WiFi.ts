import { ipcMain } from "electron";
import Command from "../../utils/Command";
import Logger from "../../utils/Logger";
import isDev = require('electron-is-dev');
import Data from "../data/Data";
import { time } from "console";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default class WiFi {
    constructor() {
        Logger.Info("Wifi module loaded");

        WiFi.checkStatusWifi();

        this.initIpc();
        
    }
 
    private static async checkStatusWifi() {
        let wifi = await Command.execute("wpa_cli status");
        try {
            let line3 = wifi.split("\n")[3];
            let ssid = line3.split("=");

            if (ssid[0] === "ssid") {
                await Data.setSaveData("wifi", {
                    ssid: ssid[1]
                })
                return true;
            } else {
                console.log("No wifi connection");
                Data.delSaveData("wifi");
                return false;
            }
        } catch (e) {
            console.log("No wifi connection");
            Data.delSaveData("wifi");

        }
    }

    static async launchWifi() {
        await Command.execute("wpa_cli -i wlp58s0 scan")
        await timeout(2000)
        return await Command.execute("wpa_cli scan_results");
    }

    private async getWifi() {
        let wifiAvailableList = [];
        var wifiscan = (!isDev) ? `bssid / frequency / signal level / flags / ssid
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman`: await WiFi.launchWifi();
        
        
        wifiscan = wifiscan.replace(/\t/g, " ");
        var listwifi = wifiscan.split("\n");

        for (let i = 1; i < listwifi.length; i++) {
            console.log(listwifi);
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
        if (args.ssid && args.password) {
            console.log(await Command.execute("wpa_cli remove_network 0"));
            console.log(await Command.execute("wpa_cli add_network"));
            console.log(await Command.execute("wpa_cli set_network 0 ssid '\"" + args.ssid + "\"'"));
            console.log(await Command.execute("wpa_cli set_network 0 psk '\"" + args.password + "\"'"));
            console.log(await Command.execute("wpa_cli enable_network 0"));
            console.log(await Command.execute("wpa_cli select_network 0"));
            await timeout(5000);
            if (WiFi.checkStatusWifi()) {
                await Data.setSaveData("wifi", args);
                await Data.setSaveData("ready", true);
                return true;
            }
            return false;
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