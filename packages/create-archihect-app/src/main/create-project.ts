import path from "path";
import fs from "fs-extra";
import { directories } from "@/utils/constants.js";
import createPackageJson from "@/helpers/create-package-json.js";
import createFilesFromTemplate from "@/helpers/create-files-from-template.js";
import install from "@/helpers/install.js";
import pc from "picocolors";
import initGit from "@/helpers/init-git.js";

export default async function createProject(
  projectName: string,
  projectPath: string,
) {
  // Create project directory
  if (fs.pathExistsSync(projectPath)) {
    if (fs.readdirSync(projectPath).length !== 0) {
      console.log(
        pc.redBright(
          "Project directory is not empty. Please choose an empty directory.",
        ),
      );
      process.exit(1);
    }
  }
  await fs.mkdir(projectPath, { recursive: true });

  // Create package.json for Nextjs
  await createPackageJson(projectName, projectPath);

  // Create base files for Nextjs
  await createFilesFromTemplate(
    path.join(directories.NEXT_TEMPLATE_DIR, "base"),
    projectPath,
  );

  await install(projectPath);

  await initGit(projectPath);

  console.log("");
  console.log(pc.greenBright("Project created successfully."));
}
