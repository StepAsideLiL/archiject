import path from "path";
import fs from "fs-extra";
import { PackageJson } from "type-fest";
import constents from "@/constents.js";

/**
 * Get the package info from package.json.
 * @returns Package info in json format.
 */
const getPackageInfo = () => {
  const packageJsonPath = path.join(constents.PACKAGE_ROOT_DIR, "package.json");

  const packageJson = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJson;
};

const packageInfo = {
  name: getPackageInfo().name || "create-archiject-app",
  description: getPackageInfo().description || "",
  version: getPackageInfo().version || "0.0.1",
};

export default packageInfo;
