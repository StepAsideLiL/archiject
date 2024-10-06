import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";

/**
 * Creates files and directory from a template directory.
 * @param templatePath Path of the template directory.
 * @param projectPath Path of the project directory.
 * @param ignore Array of patterns to ignore files.
 */
export default async function createFilesFromNextjsBaseTemplate(
  templatePath: string,
  projectPath: string,
  ignore: string[] = [],
) {
  const templateFiles = await fg.glob("**/*", {
    cwd: templatePath,
    ignore: ignore,
    dot: true,
  });

  templateFiles.forEach(async (file) => {
    const templateFilePath = path.join(templatePath, file);

    const content = await fs.readFile(templateFilePath);

    const fileName = () => {
      switch (file) {
        case ".git-ignore":
          return ".gitignore";
        default:
          return file;
      }
    };

    await fs.mkdir(path.dirname(path.join(projectPath, fileName())), {
      recursive: true,
    });

    /\.(tsx|ts|css|mjs|md|json|mdx)$/.test(file)
      ? await fs.writeFile(path.join(projectPath, fileName()), content)
      : await fs.copyFile(templateFilePath, path.join(projectPath, fileName()));
  });
}
