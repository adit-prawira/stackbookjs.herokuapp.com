import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Opening a file for editing")
    .option("-p, --port <number>", "Port number to run the server on", "4005")
    // give default value of the default file name,
    .action(async (filename = "notebook.js", options: { port: string }) => {
        try {
            const directory = path.join(process.cwd(), path.dirname(filename));
            await serve(
                parseInt(options.port),
                path.basename(filename),
                directory
            );
            console.log(
                `Opening file ${filename}\n\nNavigate to --> http://localhost:${options.port} to edit the following file.`
            );
        } catch (err) {
            //@ts-ignore
            if (err.code === "EADDRINUSE") {
                console.error(
                    "PORT is already in use. Try running in different port."
                );
            } else {
                //@ts-ignore
                console.log("Something went wrong:", err.message);
            }

            // exit the process due to the error
            process.exit(1);
        }
    });
