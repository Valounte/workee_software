import Logger from "../../utils/Logger";
import {PythonShell} from 'python-shell';
import Main from "../../main";
import { Config } from "../../config";

export default class Captor {
    static captorTempHum: PythonShell;
    
    public static init = () => {
        this.captorTempHum = new PythonShell("/home/brangers/test.py");
        Logger.Info("Captor module loaded");
        this.captorTempHum.on('message', this.sendMessageTempHumidity);
        if (Config.debugMode) {
            setInterval(() => {
                Main.win.webContents.send('getTemperatureHumitidy', {temperature: Math.floor(Math.random() * 30 + 1), humidity: Math.floor(Math.random() * 100 + 1)});
            }, 60000);
        }
    }

    private static sendMessageTempHumidity = (message: string) => {
        var obj;
        try {
            obj = JSON.parse(message);
            obj.luminosity = Math.floor(Math.random() * (100 - 80 + 1) + 80);
            obj.sound = Math.floor(Math.random() * (100 - 60 + 1) + 60);
            Main.win.webContents.send('getTemperatureHumitidy', obj);
        } catch (e) {
            console.log(e);
        }
    }
}