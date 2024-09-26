import path from "path";
import fs from "fs-extra";
import { directories } from "@/utils/constants.js";
import createPackageJson from "@/helpers/create-package-json.js";
import createFilesFromTemplate from "@/helpers/create-files-from-template.js";
import install from "@/helpers/install.js";
import pc from "picocolors";

export default async function createProject(projectName: string) {
  // Create project directory
  const projectPath = path.join(directories.CURRENT_DIR, projectName);
  if (!fs.pathExists(projectPath)) {
    await fs.mkdir(projectPath);
  } else {
    await fs.emptyDir(projectPath);
  }

  // Create package.json for Nextjs
  await createPackageJson(projectName, projectPath);

  // Create base files for Nextjs
  await createFilesFromTemplate(
    path.join(directories.NEXT_TEMPLATE_DIR, "base"),
    projectPath,
  );

  await install(projectPath);

  console.log("");
  console.log(pc.greenBright("Project created successfully."));
}
