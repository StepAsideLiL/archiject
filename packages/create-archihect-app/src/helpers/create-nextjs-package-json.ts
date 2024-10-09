import { packageVersions } from "@/utils/constants.js";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { PackageJson } from "type-fest";
import ora from "ora";
import getPackageVersion from "@/utils/get-package-version.js";
import { Options } from "@/schema.js";

/**
 * This function creates the package.json file for the project.
 * @param projectName Name of the project.
 * @param projectPath The path of the project in user's system.
 */
export default async function createNextjsPackageJson(
  projectName: string,
  projectPath: string,
  options: Options,
) {
  const spinner = ora("Creating package.json").start();

  const packageJson: PackageJson = {
    name: projectName,
    version: "0.0.1",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      "@radix-ui/react-icons": "latest",
      "class-variance-authority": "latest",
      clsx: "latest",
      "lucide-react": "latest",
      next: packageVersions.next,
      react: packageVersions.nextPeerReact,
      "react-dom": packageVersions.nextPeerReact,
      "tailwind-merge": "latest",
      "tailwindcss-animate": "latest",
    },
    devDependencies: {
      "@types/node": packageVersions.nodeTypes,
      "@types/react": packageVersions.nextPeerReact,
      "@types/react-dom": packageVersions.nextPeerReact,
      eslint: packageVersions.eslint,
      "eslint-config-next": packageVersions.next,
      postcss: packageVersions.postCss,
      prettier: "latest",
      "prettier-plugin-tailwindcss": "latest",
      tailwindcss: packageVersions.tailwindCss,
      typescript: packageVersions.typescript,
    },
  };

  if (options.darkMode) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      "@radix-ui/react-slot": "latest",
      "next-themes": "latest",
    };
  }

  for (const dependency in packageJson.dependencies) {
    if (packageJson.dependencies[dependency] === "latest") {
      packageJson.dependencies[dependency] =
        `^${await getPackageVersion(dependency)}`;
    }
  }
  for (const dependency in packageJson.devDependencies) {
    if (packageJson.devDependencies[dependency] === "latest") {
      packageJson.devDependencies[dependency] =
        `^${await getPackageVersion(dependency)}`;
    }
  }

  await fs.mkdir(projectPath, {
    recursive: true,
  });

  await fs
    .writeFile(
      path.join(projectPath, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL,
    )
    .then(() => {
      spinner.succeed("package.json is created successfully.");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
