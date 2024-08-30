#!/usr/bin/env node

import { Command } from "commander";
import { init } from "@/src/commands/init.js";

/**
 * Main entry point of Archiject CLI
 */
function main() {
  const program = new Command()
    .name("Archiject")
    .description("Build fast")
    .version("0.0.3")
    .action(() => {
      program.help();
    });

  program.addCommand(init);

  program.parse();
}

main();
