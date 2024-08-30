import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { input, confirm } from "@inquirer/prompts";
import { Command } from "commander";
import { type PackageJson } from "type-fest";

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
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Create the directory structure and copy the files from the template.
 * @param templatePath Path of the template to copy.
 * @param projectName Name of the project. A directory will be created with this name.
 */
function createDirectoryContents(templatePath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      if (file === "package.json") {
        const packageJson = fs.readJSONSync(origFilePath) as PackageJson;
        packageJson.name = projectName;

        const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
        fs.writeJsonSync(writePath, packageJson, { spaces: 2 });
      } else {
        const contents = fs.readFileSync(origFilePath, "utf8");

        const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      }

      // const contents = fs.readFileSync(origFilePath, "utf8");

      // const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
      // fs.writeFileSync(writePath, contents, "utf8");
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
