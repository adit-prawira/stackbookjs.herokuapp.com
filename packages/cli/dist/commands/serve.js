"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command("serve")
    .description("Opening a file for editing")
    .action(function () {
    console.log("Ready to serve a file");
});
