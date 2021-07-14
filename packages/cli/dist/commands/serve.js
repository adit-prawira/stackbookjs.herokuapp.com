"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Opening a file for editing")
    .option("-p, --port <number>", "Port number to run the server on")
    .action(function () {
    console.log("Ready to serve a file");
});
