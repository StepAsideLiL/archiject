import path from "path";
import fs from "fs-extra";
import { PackageJson } from "type-fest";
import { PACKAGE_ROOT_DIR } from "@/constents.js";

const getPackageInfo = () => {
  const packageJsonPath = path.join(PACKAGE_ROOT_DIR, "package.json");

  const packageJson = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJson;
};

const packageInfo = {
  name: getPackageInfo().name || "create-archiject-app",
  description: getPackageInfo().description || "",
  version: getPackageInfo().version || "0.0.1",
};

export default packageInfo;
