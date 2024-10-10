import { getPackageVersion } from "@/utils/get-package-version.js";
import userPackageManager from "@/utils/user-package-manager.js";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";
import { PackageJson } from "type-fest";

export default async function createTurboPackageJson(
  projectName: string,
  projectPath: string,
) {
  const spinner = ora("Creating root package.json for Turborepo...").start();

  const turboPackageJson: PackageJson = {
    name: projectName,
    private: true,
    scripts: {
      build: "turbo build",
      dev: "turbo dev",
      lint: "turbo lint",
      format: 'prettier --write "**/*.{ts,tsx,md}"',
    },
    devDependencies: {
      prettier: "latest",
      turbo: "latest",
      typescript: "latest",
    },
    packageManager: "",
    engines: {
      node: ">=18",
    },
  };

  for (const dependency in turboPackageJson.devDependencies) {
    if (turboPackageJson.devDependencies[dependency] === "latest") {
      turboPackageJson.devDependencies[dependency] =
        `^${await getPackageVersion(dependency)}`;
    }
  }

  turboPackageJson.packageManager = `${userPackageManager.title}@${userPackageManager.version}`;

  if (userPackageManager.title !== "pnpm") {
    turboPackageJson.workspaces = ["apps/*", "packages/*"];
  }

  await fs
    .writeFile(
      path.join(projectPath, "package.json"),
      JSON.stringify(turboPackageJson, null, 2) + os.EOL,
    )
    .then(() => {
      spinner.succeed("Root package.json for Turborepo is created.");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
