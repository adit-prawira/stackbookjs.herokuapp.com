import { Command } from "commander";
export const serveCommand = new Command()
    .command("serve")
    .description("Opening a file for editing")
    .action(() => {
        console.log("Ready to serve a file");
    });
