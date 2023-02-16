import Logger from "../../utils/Logger";
import cron = require("node-cron");
import Main from "../../main";


export class Message {
    private static _instance: Message;
    private job: cron.ScheduledTask;

    constructor(message: string, type: string, cronInfo: string) {
        Logger.Info("Message Job started at " + cronInfo);
        this.job = cron.schedule(cronInfo, () => {
            Main.win.webContents.send('message:send', {message: message, type: type});
        });
    }
}

export class MessageJobs {
    private static _instance: MessageJobs;

    constructor() { 
        Logger.Info("MessageJobs module loaded");
        new Message("Pensez bien à vous hydrater toutes les heures", "HYDRATION","0 0 */2 * * *");
    }
}