#!/usr/bin/env node

import { Command } from "commander";
import packageInfo from "@/utils/package-info.js";
import { input } from "@inquirer/prompts";
import validateProjectName from "@/utils/validate-project-name.js";
import createProject from "@/main/create-project.js";
import path from "path";

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
    .argument("[dir]", "The name of the project directory.")
    .usage("[dir] [opts]")
    .parse(process.argv);

  let projectName: string = "an-archiject-app";
  let resolvedProjectPath: string = path.resolve(projectName);

  if (program.args.length > 0) {
    const projectDirName = program.args[0].trim();
    resolvedProjectPath = path.resolve(projectDirName);
    projectName = path.basename(resolvedProjectPath);

    if (!validateProjectName(projectName)) {
      console.log(
        "Project name may only include letters, numbers, underscores and hashes.",
      );
      process.exit(1);
    }
  } else {
    await input({
      message: "Project Name",
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
        resolvedProjectPath = path.resolve(answer);
        projectName = path.basename(resolvedProjectPath);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }

  await createProject(projectName, resolvedProjectPath);
}

main();
