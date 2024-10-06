import path from "path";
import fs from "fs-extra";
import { directories } from "@/utils/constants.js";
import createPackageJson from "@/helpers/create-package-json.js";
import createFilesFromNextjsBaseTemplate from "@/helpers/create-files-from-nextjs-base-template.js";
import installPackages from "@/helpers/install-packages.js";
import pc from "picocolors";
import initGit from "@/helpers/init-git.js";
import { type Options } from "@/schema.js";
import createFilesFromNextjsOptionsTemplate from "@/helpers/create-files-from-nextjs-options-template.js";
import installDarkModeFeature from "@/helpers/install-dark-mode-feature.js";
import ora from "ora";

export default async function createProject(
  projectName: string,
  projectPath: string,
  options: Options,
) {
  // Create project directory
  if (fs.pathExistsSync(projectPath)) {
    if (fs.readdirSync(projectPath).length !== 0) {
      console.log(
        pc.redBright(
          "Project directory is not empty. Please choose an empty directory.",
        ),
      );
      process.exit(1);
    }
  }
  await fs.mkdir(projectPath, { recursive: true });

  const spinner = ora("Saffolding Nextjs files...").start();
  await Promise.all([
    // Create base files for Nextjs
    await createFilesFromNextjsBaseTemplate(
      path.join(directories.NEXT_TEMPLATE_DIR, "base"),
      projectPath,
    ),

    // Create files for Nextjs based on options
    await createFilesFromNextjsOptionsTemplate(
      path.join(directories.NEXT_TEMPLATE_DIR, "options"),
      projectPath,
      options,
    ),
  ]).then(() => {
    spinner.succeed("Saffolding Nextjs files is done.");
  });

  // Create package.json for Nextjs
  await createPackageJson(projectName, projectPath);

  await Promise.all([
    options.install && (await installPackages(projectPath)),
    options.darkMode && (await installDarkModeFeature(projectPath)),
    options.git && (await initGit(projectPath)),
  ]);
}
