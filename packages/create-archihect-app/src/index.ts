#!/usr/bin/env node

import { Command } from "commander";
import packageInfo from "@/utils/packageInfo.js";
import userPackageManager from "@/utils/userPackageManager.js";

/**
 * Main entry point of create-archiject-app CLI
 */
function main() {
  let projectName: string = "an-archihect-app";

  const program = new Command("create-archiject-app")
    .description("Create an archihect app with CLI.")
    .version(
      packageInfo.name,
      "-v, --version",
      "Output the current version of create-archiject-app.",
    )
    .argument("[dir]", "The name of the directory and the application.")
    .usage("[dir] [opts]")
    .parse(process.argv);

  if (program.args) {
    projectName = program.args[0];
  }

  console.log(userPackageManager);
}

main();
