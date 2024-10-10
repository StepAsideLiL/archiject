import userPackageManager from "@/utils/user-package-manager.js";
import * as e from "execa";
import fs from "fs-extra";
import path from "path";
import { PackageJson } from "type-fest";
import pc from "picocolors";

/**
 * Install dependencies for the project.
 * @param projectPath Path of the project directory.
 */
export default async function installPackages(
  projectPath: string,
  nextjsProjectPath: string,
) {
  if (projectPath === nextjsProjectPath) {
    const packageJson: PackageJson = await fs.readJson(
      path.join(projectPath, "package.json"),
    );

    console.log("");
    console.log(`Installing dependencies:`);
    console.log(`------------------------`);

    for (const key in packageJson.dependencies) {
      console.log(
        `${pc.cyan(`${key}`)}: ${pc.cyanBright(`${packageJson.dependencies[key]}`)}`,
      );
    }

    console.log("");
    console.log(`Installing dev dependencies:`);
    console.log(`----------------------------`);

    for (const key in packageJson.devDependencies) {
      console.log(
        `${pc.cyan(`${key}`)}: ${pc.cyanBright(`${packageJson.devDependencies[key]}`)}`,
      );
    }
  } else {
    const packageJson: PackageJson = await fs.readJson(
      path.join(projectPath, "package.json"),
    );

    const packageJsonNextjs: PackageJson = await fs.readJson(
      path.join(nextjsProjectPath, "package.json"),
    );

    console.log("");
    console.log(`Installing Turbo dev dependencies:`);

    for (const key in packageJson.devDependencies) {
      console.log(
        `${pc.cyan(`${key}`)}: ${pc.cyanBright(`${packageJson.devDependencies[key]}`)}`,
      );
    }

    console.log("");
    console.log(`Installing Nextjs dependencies:`);

    for (const key in packageJsonNextjs.dependencies) {
      console.log(
        `${pc.cyan(`${key}`)}: ${pc.cyanBright(`${packageJsonNextjs.dependencies[key]}`)}`,
      );
    }

    console.log("");
    console.log(`Installing Nextjs dev dependencies:`);

    for (const key in packageJsonNextjs.devDependencies) {
      console.log(
        `${pc.cyan(`${key}`)}: ${pc.cyanBright(`${packageJsonNextjs.devDependencies[key]}`)}`,
      );
    }
  }

  const installationProcess = e.execa(userPackageManager.title, ["install"], {
    cwd: projectPath,
    stdio: "inherit",
  });

  console.log("");

  await installationProcess;
}
