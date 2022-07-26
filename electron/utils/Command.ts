import { exec } from "child_process";

export default class Command {
    public static async execute(command: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                   }
                resolve(stdout? stdout : stderr);
            });
        });
    }
}