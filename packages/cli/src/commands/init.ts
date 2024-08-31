import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { input, confirm } from "@inquirer/prompts";
import { Command } from "commander";
import { execa } from "execa";
import createDirectoryContents from "@/src/utils/createDirectoryContents.js";

const CURRENT_DIR = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${__dirname}/../templates/nextjs-with-src/files`;

const CHOICES = fs.readdirSync(
  `${__dirname}/../templates/nextjs-with-src/files`,
);

/**
 * init command to initialize a new nextjs project.
 */
export const init = new Command()
  .name("init")
  .description("Initialize a new project")
  .action(() => {
    createNextjsProject();
  });

/**
 * Create a new Nextjs project
 */
const createNextjsProject = () => {
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
            createNextjsProject();
          }
        });
      }

      return answer;
    })
    .then(async (answer) => {
      const { stdout } = await execa("pnpm", ["install"], {
        cwd: path.join(CURRENT_DIR, answer),
      });

      console.log(stdout);
    })
    .catch((error) => {
      console.log(error);
    });
};
