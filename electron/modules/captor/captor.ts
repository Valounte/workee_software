import Logger from "../../utils/Logger";
import {PythonShell} from 'python-shell';

export default class Captor {
    static captorTempHum: PythonShell;
    public static init = () => {
        this.captorTempHum = new PythonShell("/home/brangers/test.py");
        Logger.Info("Captor module loaded");
        this.captorTempHum.on('message', function(message) {
            console.log(message);
          })
    }
}