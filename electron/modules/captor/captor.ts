import Logger from "../../utils/Logger";
import {PythonShell} from 'python-shell';
import Main from "../../main";

export default class Captor {
    static captorTempHum: PythonShell;
    static win: Electron.BrowserWindow | null;
    public static init = (win: Electron.BrowserWindow) => {
        this.captorTempHum = new PythonShell("/home/brangers/test.py");
        this.win = win;
        Logger.Info("Captor module loaded");
        this.captorTempHum.on('message', this.sendMessageTempHumidity);
    }

    private static sendMessageTempHumidity = (message: string) => {
        var obj;
        try {
            obj = JSON.parse(message);
            this.win.webContents.send('getTemperatureHumitidy', obj);
        } catch (e) {
            console.log(e);
        }
    }
}