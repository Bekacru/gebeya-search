import { Command } from "commander";

import { Telegram } from "./telegram";
import { logger } from "./utils/logger";

async function main() {
  const program = new Command()
    .name("gebeyasearch setup cli")
    .description("Bootstrap the project");
  program.addCommand(Telegram);
  program.parse();
}

main().catch((e) => {
  logger.error(e);
});
