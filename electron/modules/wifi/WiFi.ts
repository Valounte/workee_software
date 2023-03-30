import { ipcMain } from "electron";
import Command from "../../utils/Command";
import Logger from "../../utils/Logger";
import Data from "../data/Data";
import { Config } from "../../config";
import  { networkInterfaces } from 'os';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default class WiFi {
    constructor() {
        Logger.Info("Wifi module loaded");
        if (!Config.isWindows) {
            WiFi.checkStatusWifi();
        }

        this.initIpc();
        
    }
 
    private static async checkStatusWifi() {
        const wifi = await Command.execute("wpa_cli status");
        try {
            const line3 = wifi.split("\n")[3];
            const ssid = line3.split("=");

            if (ssid[0] === "ssid") {
                await Data.setSaveData("wifi", {
                    ssid: ssid[1]
                })
                Logger.Info("Wifi connected to " + ssid[1]);
                return true;
            } else {
                Logger.Warn("Wifi not connected");
                Data.delSaveData("wifi");
                return false;
            }
        } catch (e) {
            Logger.Warn("Wifi not connected");
            if (!Config.isWindows) {
                Data.delSaveData("wifi");
            }

        }
    }

    static async launchWifi() {
        await Command.execute("wpa_cli scan")
        await timeout(2000)
        return await Command.execute("wpa_cli scan_results");
    }

    private async getWifi() {
        const wifiAvailableList = [];
        let wifiscan = (Config.isWindows) ? `bssid / frequency / signal level / flags / ssid
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman111
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman11
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman1
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman3
f8:1a:67:78:4b:af	2462	-34	[WPA2-PSK-CCMP][ESS]	buhman2`: await WiFi.launchWifi();
        
        
        wifiscan = wifiscan.replace(/\t/g, " ");
        const listwifi = wifiscan.split("\n");

        for (let i = 1; i < listwifi.length; i++) {
            const wifi = listwifi[i];
            const wifiinfo = wifi.split(" ");
            const wifiobj = {
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
            if (!Config.isWindows) {
                // console.log(await Command.execute("wpa_cli remove_network 0"));
                // console.log(await Command.execute("wpa_cli add_network"));
                // console.log(await Command.execute("wpa_cli set_network 0 ssid '\"" + args.ssid + "\"'"));
                // console.log(await Command.execute("wpa_cli set_network 0 psk '\"" + args.password + "\"'"));
                // console.log(await Command.execute("wpa_cli enable_network 0"));
                // console.log(await Command.execute("wpa_cli select_network 0"));
                await timeout(5000);
                if (WiFi.checkStatusWifi()) {
                    await Data.setSaveData("wifi", args);
                    await Data.setSaveData("ready", true);
                    return true;
                }
                
                return false;
            } else {
                await Data.setSaveData("wifi", args);
                return true;
            }
        } else {
            return false;
        }
    }

    public async getLocalIp() {
        const interfaces = networkInterfaces();
        try {
            const ip = interfaces["wlan0"][0].address;
            return ip;
        } catch (e) {
            return null;
        }
    }

    public initIpc(): void {
        ipcMain.handle("wifi:get", this.getWifi);
        ipcMain.handle("wifi:connect", this.connectWifi);
        ipcMain.handle("wifi:getLocalIp", this.getLocalIp);
    }

    public getWifiList(): any {
        return [];
    }
}