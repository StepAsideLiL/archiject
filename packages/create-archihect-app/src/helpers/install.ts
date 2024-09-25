import userPackageManager from "@/utils/user-package-manager.js";
import * as e from "execa";
import fs from "fs-extra";
import path from "path";
import { PackageJson } from "type-fest";
import chalk from "chalk";

/**
 * Install dependencies for the project.
 * @param projectPath Path of the project directory.
 */
export default async function install(projectPath: string) {
  const packageJson: PackageJson = await fs.readJson(
    path.join(projectPath, "package.json"),
  );

  console.log("");
  console.log(`Installing dependencies:`);
  console.log(`------------------------`);

  for (const key in packageJson.dependencies) {
    console.log(chalk.blueBright(`${key}: ${packageJson.dependencies[key]}`));
  }

  console.log("");
  console.log(`Installing dev dependencies:`);
  console.log(`----------------------------`);

  for (const key in packageJson.devDependencies) {
    console.log(
      chalk.blueBright(`${key}: ${packageJson.devDependencies[key]}`),
    );
  }

  // const installationProcess = e.execa(userPackageManager, ["install"], {
  //   cwd: projectPath,
  //   stdio: "inherit",
  // });

  // console.log("");

  // await installationProcess;
}
