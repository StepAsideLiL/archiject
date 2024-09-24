import { execa } from "execa";
import path from "path";
import fs from "fs-extra";
import { directories } from "@/utils/constants.js";
import fg from "fast-glob";
import createPackageJson from "@/helpers/create-package-json.js";

export default async function createProject(projectName: string) {
  // Create project directory
  const projectPath = path.join(directories.CURRENT_DIR, projectName);
  if (!fs.pathExists(projectPath)) {
    await execa`mkdir ${projectPath}`;
  } else {
    await fs.emptyDir(projectPath);
  }

  // Create package.json for Nextj
  await createPackageJson(projectName, projectPath);

  // Create base files for Nextjs
  const baseFilesToCreate = fs.readdirSync(
    path.join(directories.TEMPLATE_DIR, "nextjs/base"),
  );

  baseFilesToCreate.forEach(async (file) => {
    const baseFilePath = path.join(
      directories.TEMPLATE_DIR,
      "nextjs/base",
      file,
    );

    const fileContent = await fs.readFile(baseFilePath, "utf8");

    if (file === ".git-ignore") {
      await fs.writeFile(`${projectPath}/.gitignore`, fileContent, "utf8");
    } else {
      await fs.writeFile(`${projectPath}/${file}`, fileContent, "utf8");
    }
  });

  // Create App directory files for Nextjs
  const nextAppDir = path.join(projectPath, "app");

  await execa`mkdir ${nextAppDir}`;

  const appDirTemplatePath = path.join(directories.NEXT_TEMPLATE_DIR, "app");

  const filesToCreate = await fg.glob("**/*", {
    cwd: appDirTemplatePath,
    ignore: ["**/fonts/*"],
  });

  filesToCreate.forEach(async (file) => {
    const targetPath = path.join(appDirTemplatePath, file);
    const content = await fs.readFile(targetPath);
    await fs.writeFile(`${nextAppDir}/${file}`, content);
  });

  await execa`mkdir ${nextAppDir}/fonts`;

  const copyfonts = await fg.glob("**/fonts/*", {
    cwd: appDirTemplatePath,
  });

  copyfonts.forEach(async (file) => {
    const targetPath = path.join(appDirTemplatePath, file);
    await fs.copyFile(targetPath, `${nextAppDir}/${file}`);
  });

  console.log("Project created successfully.");
}
