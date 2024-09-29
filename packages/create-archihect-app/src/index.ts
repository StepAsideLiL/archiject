#!/usr/bin/env node

import { Command } from "commander";
import packageInfo from "@/utils/package-info.js";
import { input, select } from "@inquirer/prompts";
import validateProjectName from "@/utils/validate-project-name.js";
import createProject from "@/create-project.js";
import path from "path";
import { optionsSchema } from "@/schema.js";
import { colors } from "@/utils/contents/colors.js";

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
    .usage("[dir] [opts]")
    .argument("[dir]", "The name of the project directory.")
    .option("-d --default", "Use default options.", false)
    .option("--style [style]", "The style is based on Shadcn.", "new-york")
    .option("--color [color]", "The color is based on Shadcn.", "neutral")
    .option("--no-install", "Skip installing dependencies.")
    .option("--no-git", "Skip initializing git.")
    .parse(process.argv);

  let projectName: string = "an-archiject-app";
  let resolvedProjectPath: string = path.resolve(projectName);

  const options = optionsSchema.parse(program.opts());

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

  if (!options.default) {
    await select({
      message: "Select the style",
      choices: ["new-york", "default"],
      default: options.style,
    })
      .then((answer) => {
        options.style = answer === "new-york" ? "new-york" : "default";
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });

    await select({
      message: "Select the color",
      choices: colors.map((color) => color.name),
      default: options.color,
    })
      .then((answer) => {
        options.color = (answer as string).toLowerCase();
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }

  await createProject(projectName, resolvedProjectPath, options);
}

main();
