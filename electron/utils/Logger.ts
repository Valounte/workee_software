import {getLogger} from 'log4js';

export default class Logger {

    private static logger: any;

    public static init() {
        this.logger = getLogger("BrangersTV");
        this.logger.level = "debug";
    }

    public static Debug = (message: string) => {
        this.logger.debug(message);
    };

    public static Info = (message: string) => {
        this.logger.info(message);
    };

    public static Warn = (message: string) => {
        this.logger.warn(message);
    };

    public static Error = (message: string) => {
        this.logger.error(message);
    };

    public static Fatal = (message: string) => {
        this.logger.fatal(message);
    };

    public static Trace = (message: string) => {
        this.logger.trace(message);
    };
}