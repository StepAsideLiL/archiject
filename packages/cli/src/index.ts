#!/usr/bin/env node

import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { input, confirm } from "@inquirer/prompts";

const CURRENT_DIR = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${__dirname}/../templates/nextjs-with-src/files`;

const CHOICES = fs.readdirSync(
  `${__dirname}/../templates/nextjs-with-src/files`,
);

// console.log(CHOICES);

const runFunc = () => {
  input({
    message: "Project name",
    default: "my-archiject-project",
    validate: (input: string) => {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) {
        return true;
      } else {
        return "Project name may only include letters, numbers, underscores and hashes.";
      }
    },
  })
    .then((answer) => {
      // console.log(answer);
      const projectName = answer;
      const projectPath = `${CURRENT_DIR}/${projectName}`;

      const isDirExists = fs.existsSync(projectPath);
      if (!isDirExists) {
        fs.mkdirSync(projectPath);
        createDirectoryContents(TEMPLATE_PATH, projectName);
      } else {
        confirm({
          message:
            "This directory already exists. Do you want to overwrite it? (y/n)",
          default: true,
        }).then((answer) => {
          if (answer) {
            fs.rmSync(projectPath, { recursive: true, force: true });
            fs.mkdirSync(projectPath);
            createDirectoryContents(TEMPLATE_PATH, projectName);
          } else {
            runFunc();
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

runFunc();

function createDirectoryContents(templatePath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  console.log("from", filesToCreate);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIR}/${projectName}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${projectName}/${file}`,
      );
    }
  });
}
