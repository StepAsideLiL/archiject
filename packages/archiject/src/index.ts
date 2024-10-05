#!/usr/bin/env node

import { Command } from "commander";
import { init } from "@/src/commands/init.js";

import { getPackageVersion } from "@/src/utils/packageInfo.js";

/**
 * Main entry point of Archiject CLI
 */
function main() {
  const program = new Command()
    .name("Archiject")
    .description("Build fast")
    .version(getPackageVersion() || "0.0.1")
    .action(() => {
      program.help();
    });

  program.addCommand(init);

  program.parse();
}

main();
