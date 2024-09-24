#!/usr/bin/env node

import { Command } from "commander";
import packageInfo from "@/utils/packageInfo.js";
import { input } from "@inquirer/prompts";
import validateProjectName from "@/utils/validateProjectName.js";
import createProject from "@/main/createProject.js";

/**
 * Main entry point of create-archiject-app CLI
 */
async function main() {
  const program = new Command("create-archiject-app")
    .description("Create an archihect app with CLI.")
    .version(
      packageInfo.version,
      "-v, --version",
      "Output the current version of create-archiject-app.",
    )
    .argument("[dir]", "The name of the directory and the application.")
    .usage("[dir] [opts]")
    .parse(process.argv);

  let projectName: string = "an-archiject-app";

  if (program.args.length > 0) {
    projectName = program.args[0];
    if (!validateProjectName(projectName)) {
      console.log(
        "Project name may only include letters, numbers, underscores and hashes.",
      );
      process.exit(1);
    }
  } else {
    await input({
      message: "Project name",
      default: projectName,
      validate: (input: string) => {
        if (validateProjectName(input)) {
          return true;
        } else {
          return "Project name may only include letters, numbers, underscores and hashes.";
        }
      },
    })
      .then((answer) => {
        projectName = answer;
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }

  await createProject(projectName);

  console.log("Finish");
}

main();
