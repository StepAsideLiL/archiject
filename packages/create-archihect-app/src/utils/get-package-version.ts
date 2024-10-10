import * as e from "execa";
import userPackageManager from "@/utils/user-package-manager.js";

/**
 * Get the version of a package.
 * @param packageName Name of the package.
 * @returns Version of the package.
 */
export async function getPackageVersion(packageName: string) {
  try {
    const version = await e.execa(userPackageManager.title, [
      "view",
      packageName,
      "version",
    ]);
    return version.stdout;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get the latest full version of a specific Nextjs version.
 * @param version Nextjs version
 * @returns Latest full version of that specific Nextjs version.
 */
export async function getNextjsVersion(version: string | number) {
  const { stdout } = await e.execa("npm", [
    "view",
    `next@${version}`,
    "version",
  ]);

  return stdout
    .split("\n")
    .at(-1)
    ?.match(/'([^']+)'/)?.[1];
}
