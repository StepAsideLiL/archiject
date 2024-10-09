import userPackageManager from "@/utils/user-package-manager.js";
import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";

export default async function createFilesFromTurboTamplate(
  templatePath: string,
  projectPath: string,
  ignore: string[] = [],
) {
  const templateFiles = await fg.glob("**/*", {
    cwd: templatePath,
    ignore: ignore,
    dot: true,
  });

  templateFiles.forEach(async (fileName) => {
    const templateFilePath = path.join(templatePath, fileName);

    const content = await fs.readFile(templateFilePath, "utf-8");

    const modifiedFileName = () => {
      switch (fileName) {
        case ".git-ignore":
          return ".gitignore";
        default:
          return fileName;
      }
    };

    await fs.mkdir(path.dirname(path.join(projectPath, modifiedFileName())), {
      recursive: true,
    });

    if (
      fileName === "pnpm-workspace.yaml" &&
      userPackageManager.title !== "pnpm"
    ) {
      return;
    }
    await fs.writeFile(path.join(projectPath, modifiedFileName()), content);
  });
}
