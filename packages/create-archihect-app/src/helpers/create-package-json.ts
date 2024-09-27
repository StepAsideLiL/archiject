import { packageVersions } from "@/utils/constants.js";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { PackageJson } from "type-fest";
import ora from "ora";

/**
 * This function creates the package.json file for the project.
 * @param projectName Name of the project.
 * @param projectPath The path of the project in user's system.
 */
export default async function createPackageJson(
  projectName: string,
  projectPath: string,
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
      "@radix-ui/react-icons": "^1.3.0",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.1.1",
      "lucide-react": "^0.446.0",
      next: packageVersions.next,
      react: packageVersions.nextPeerReact,
      "react-dom": packageVersions.nextPeerReact,
      "tailwind-merge": "^2.5.2",
      "tailwindcss-animate": "^1.0.7",
    },
    devDependencies: {
      "@types/node": packageVersions.nodeTypes,
      "@types/react": packageVersions.nextPeerReact,
      "@types/react-dom": packageVersions.nextPeerReact,
      eslint: packageVersions.eslint,
      "eslint-config-next": packageVersions.next,
      postcss: packageVersions.postCss,
      prettier: "^3.3.3",
      "prettier-plugin-tailwindcss": "^0.6.8",
      tailwindcss: packageVersions.tailwindCss,
      typescript: packageVersions.typescript,
    },
  };

  await fs
    .writeFile(
      path.join(projectPath, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL,
    )
    .then(() => {
      spinner.succeed("package.json created successfully.");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
