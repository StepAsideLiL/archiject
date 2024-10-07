import { directories } from "@/utils/constants.js";
import fs from "fs-extra";
import path from "path";
import * as e from "execa";
import pc from "picocolors";
import userPackageManager from "@/utils/user-package-manager.js";

type Feature = {
  name: string;
  version: string;
  dependencies: {
    packages: string[];
    ui: string[];
  };
};

/**
 * Install dark mode feature for the project.
 * @param projectPath Path of the project directory.
 */
export default async function installDarkModeFeature(projectPath: string) {
  console.log("");
  console.log(pc.magentaBright("Installing dark mode feature..."));

  const pathToFeature = path.join(
    directories.NEXT_TEMPLATE_DIR,
    "options/features/dark-mode/info.json",
  );

  const featureInfo = (await fs.readJson(pathToFeature)) as Feature;

  await Promise.all([
    await e.execa(
      userPackageManager.title,
      ["install", featureInfo.dependencies.packages.join(" ")],
      {
        cwd: projectPath,
        stdio: "inherit",
      },
    ),

    await e.execa(
      userPackageManager.executables,
      ["shadcn@latest", "add", featureInfo.dependencies.ui.join(" ")],
      {
        cwd: projectPath,
        stdio: "inherit",
      },
    ),
  ]);
}
