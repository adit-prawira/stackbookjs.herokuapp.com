import { Command } from "commander";
export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Opening a file for editing")
    .option("-p, --port <number>", "Port number to run the server on", " ")
    .action(() => {
        console.log("Ready to serve a file");
    });
