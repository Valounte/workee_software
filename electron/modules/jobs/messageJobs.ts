import Logger from "../../utils/Logger";
import cron = require("node-cron");
import { ipcMain } from "electron";
import Main from "../../main";


export class Message {
    private static _instance: Message;
    private job: cron.ScheduledTask;

    constructor(message: string, cronInfo: string) {
        Logger.Info("Message Job started at " + cronInfo);
        this.job = cron.schedule(cronInfo, () => {
            Main.win.webContents.send('message:send', {message: message});
        });
    }
}

export class MessageJobs {
    private static _instance: MessageJobs;

    constructor() { 
        Logger.Info("MessageJobs module loaded");
        new Message("Pensez bien à vous hydrater toutes les heures", "* * */2 * * *");
    }
}