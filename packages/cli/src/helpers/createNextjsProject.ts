import fs from "fs-extra";
import { confirm } from "@inquirer/prompts";
import createDirectoryContents from "@/src/utils/createDirectoryContents.js";

import { CURRENT_DIR, NEXTJS_TEMPLATE_PATH } from "@/src/constents.js";
import path from "path";
import { execa } from "execa";

/**
 * Initiate a Nextjs project.
 * @param projectName Name of the project.
 */
export default async function createNextjsProject(projectName: string) {
  const projectPath = `${CURRENT_DIR}/${projectName}`;

  const isDirExists = fs.existsSync(projectPath);
  if (!isDirExists) {
    fs.mkdirSync(projectPath);
    createDirectoryContents(NEXTJS_TEMPLATE_PATH, projectName);
  } else {
    confirm({
      message:
        "This directory already exists. Do you want to overwrite it? (y/n)",
      default: true,
    }).then((answer) => {
      if (answer) {
        fs.rmSync(projectPath, { recursive: true, force: true });
        fs.mkdirSync(projectPath);
        createDirectoryContents(NEXTJS_TEMPLATE_PATH, projectName);
      } else {
        process.exit();
      }
    });
  }

  const { stdout } = await execa("pnpm", ["install"], {
    cwd: path.join(CURRENT_DIR, projectName),
  });

  console.log(stdout);
}
