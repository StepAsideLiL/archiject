import { packageVersions } from "@/utils/constants.js";
import fsExtra from "fs-extra";
import path from "path";
import os from "os";
import { PackageJson } from "type-fest";

/**
 * This function creates the package.json file for the project.
 * @param projectName Name of the project.
 * @param projectPath The path of the project in user's system.
 */
export default async function createPackageJson(
  projectName: string,
  projectPath: string,
) {
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
      next: packageVersions.next,
      react: packageVersions.nextPeerReact,
      "react-dom": packageVersions.nextPeerReact,
    },
    devDependencies: {
      typescript: packageVersions.typescript,
      "@types/node": packageVersions.nodeTypes,
      "@types/react": packageVersions.nextPeerReact,
      "@types/react-dom": packageVersions.nextPeerReact,
      postcss: packageVersions.postCss,
      tailwindcss: packageVersions.tailwindCss,
      eslint: packageVersions.eslint,
      "eslint-config-next": packageVersions.next,
    },
  };

  await fsExtra.writeFile(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );
}
