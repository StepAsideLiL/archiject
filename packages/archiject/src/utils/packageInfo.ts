import path from "path";
import fs from "fs-extra";
import { PackageJson } from "type-fest";
import { PACKAGE_ROOT_DIR } from "@/src/constents.js";

export function getPackageVersion() {
  const packageJsonPath = path.join(PACKAGE_ROOT_DIR, "package.json");

  const packageJson = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJson.version;
}
