import { Command } from "commander";

import { Telegram } from "./telegram";

function main() {
    const program = new Command()
        .name("gebeyasearch setup cli")
        .description("Bootstrap the project");
    program.addCommand(Telegram);
    program.parse();
}

main();
