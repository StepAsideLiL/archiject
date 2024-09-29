import { directories } from "@/utils/constants.js";
import fs from "fs-extra";
import path from "path";
import * as e from "execa";
import userPackageManager, {
  userPackageManagerExecutables,
} from "@/utils/user-package-manager.js";

type Feature = {
  name: string;
  version: string;
  dependencies: {
    packages: string[];
    ui: string[];
  };
};

export default async function installFeature(
  projectPath: string,
  feature: string,
) {
  const pathToFeature = path.join(
    directories.NEXT_TEMPLATE_DIR,
    "options/features/dark-mode/info.json",
  );

  const featureInfo = (await fs.readJson(pathToFeature)) as Feature;

  featureInfo.dependencies.packages.forEach(async (packageName) => {
    await e.execa(userPackageManager, ["install", packageName], {
      cwd: projectPath,
      stdio: "inherit",
    });
  });

  featureInfo.dependencies.ui.forEach(async (uiName) => {
    await e.execa(
      userPackageManagerExecutables,
      ["shadcn@latest", "add", uiName],
      {
        cwd: projectPath,
        stdio: "inherit",
      },
    );
  });
}
