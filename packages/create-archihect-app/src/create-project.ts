import path from "path";
import fs from "fs-extra";
import { directories } from "@/utils/constants.js";
import createNextjsPackageJson from "@/helpers/create-nextjs-package-json.js";
import createFilesFromNextjsBaseTemplate from "@/helpers/create-files-from-nextjs-base-template.js";
import installPackages from "@/helpers/install-packages.js";
import pc from "picocolors";
import initGit from "@/helpers/init-git.js";
import { type Options } from "@/schema.js";
import createFilesFromNextjsOptionsTemplate from "@/helpers/create-files-from-nextjs-options-template.js";
import ora from "ora";
import createTurboPackageJson from "@/helpers/create-turbo-package-json.js";
import createFilesFromTurboTamplate from "@/helpers/create-files-from-turbo-template.js";

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

  let nextjsProjectName = projectName;
  let nextjsProjectPath = projectPath;

  if (options.turbo) {
    // Create package.json for Turbo
    await createTurboPackageJson(projectName, projectPath);

    // Create files for Turbo
    const creatingTurboFileSpinner = ora("Saffolding Turbo files...").start();
    await createFilesFromTurboTamplate(
      directories.TURBO_TEMPLATE_DIR,
      projectPath,
    ).then(() => {
      creatingTurboFileSpinner.succeed("Saffolding Turbo files is done.");
    });

    nextjsProjectName = "web";
    nextjsProjectPath = path.join(projectPath, "apps", nextjsProjectName);
  }

  // Create package.json for Nextjs
  await createNextjsPackageJson(nextjsProjectName, nextjsProjectPath, options);

  const creatingNextjsFileSpinner = ora("Saffolding Nextjs files...").start();
  await Promise.all([
    // Create base files for Nextjs
    await createFilesFromNextjsBaseTemplate(
      path.join(directories.NEXT_TEMPLATE_DIR, "base"),
      nextjsProjectPath,
    ),

    // Create files for Nextjs based on options
    await createFilesFromNextjsOptionsTemplate(
      path.join(directories.NEXT_TEMPLATE_DIR, "options"),
      nextjsProjectPath,
      options,
    ),
  ]).then(() => {
    creatingNextjsFileSpinner.succeed("Saffolding Nextjs files is done.");
  });

  await Promise.all([
    options.install && (await installPackages(projectPath)),
    options.git && (await initGit(projectPath)),
  ]);
}
