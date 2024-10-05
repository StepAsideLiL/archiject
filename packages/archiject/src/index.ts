#!/usr/bin/env node

import { Command } from "commander";
import { init } from "@/commands/init.js";

import packageInfo from "@/utils/package-info.js";

/**
 * Main entry point of Archiject CLI
 */
function main() {
  const program = new Command()
    .name(packageInfo.name)
    .description(packageInfo.description)
    .version(
      packageInfo.version,
      "-v, --version",
      "Output the current version of create-archiject-app.",
    )
    .action(() => {
      program.help();
    });

  program.addCommand(init);

  program.parse();
}

main();
