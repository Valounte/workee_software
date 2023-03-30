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
            }, 3000);
        }
    }

    private static sendMessageTempHumidity = (message: string) => {
        var obj;
        try {
            obj = JSON.parse(message);
            obj.luminosity = Math.floor(Math.random() * (300 - 200 + 1) + 200);
            obj.sound = Math.floor(Math.random() * (81 - 30 + 1) + 30);
            Main.win.webContents.send('getTemperatureHumitidy', obj);
            console.log(obj);
        } catch (e) {
            console.log(e);
        }
    }
}