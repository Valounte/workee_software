import Logger from "../../utils/Logger";
import { ipcMain } from "electron";
import cron = require("node-cron");
import Main from "../../main";

export class feedBack {
    private task;

    constructor(cronInfo: string) {
        Logger.Info("Cron started at " + cronInfo);
        
        this.task = cron.schedule("*/10 * * * * *", () => {
            Main.win.webContents.send('feedback:launch', {});
        });

        this.task.start();
    }
}

export class feedBackJobs {

    static feedBackList = {};

    constructor() {
        Logger.Info("feedBackJobs module loaded");
        this.initIpc();
    }

    public createFeedBack(event, args) {
        if (!feedBackJobs.feedBackList['#' + args.id]) {
            feedBackJobs.feedBackList['#' + args.id] = new feedBack(args.cron);
        }
    }

    public initIpc(): void {
        ipcMain.handle("feedback:create", this.createFeedBack);
    }
}