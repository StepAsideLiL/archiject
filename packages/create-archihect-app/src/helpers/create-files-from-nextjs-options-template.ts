import { getColorByLabel } from "@/utils/contents/colors.js";
import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";

/**
 * Creates files and directory from Nextjs options template directory.
 * @param templatePath Path of the template directory.
 * @param projectPath Path of the project directory.
 * @param style Name of the style.
 * @param color Name of the color lebel.
 * @param ignore Array of patterns to ignore files.
 */
export default async function createFilesFromNextjsOptionsTemplate(
  templatePath: string,
  projectPath: string,
  style: string,
  color: string,
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

    await fs.mkdir(path.dirname(path.join(projectPath, fileName)), {
      recursive: true,
    });

    if (fileName === "app/globals.css") {
      await fs.writeFile(
        path.join(projectPath, fileName),
        content.replace("/* <<color>> */", getColorByLabel(color)),
      );
    } else if (fileName === "components.json") {
      await fs.writeFile(
        path.join(projectPath, fileName),
        content.replace("<<style>>", style).replace("<<baseColor>>", color),
      );
    } else {
      await fs.writeFile(path.join(projectPath, fileName), content);
    }
  });

  console.log(templateFiles);
}
