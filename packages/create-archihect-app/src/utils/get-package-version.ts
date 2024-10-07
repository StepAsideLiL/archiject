import * as e from "execa";
import userPackageManager from "@/utils/user-package-manager.js";

/**
 * This function returns the version of a package.
 * @param packageName Name of the package.
 * @returns Version of the package.
 */
export default async function getPackageVersion(packageName: string) {
  try {
    const version = await e.execa(userPackageManager, [
      "view",
      packageName,
      "version",
    ]);
    return version.stdout;
  } catch (error) {
    console.log(error);
  }
}
