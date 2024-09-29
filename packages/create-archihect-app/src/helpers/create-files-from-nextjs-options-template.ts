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
  darkMode: boolean,
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

    if (fileName === "app/globals.css") {
      await fs.mkdir(path.dirname(path.join(projectPath, fileName)), {
        recursive: true,
      });

      await fs.writeFile(
        path.join(projectPath, fileName),
        content.replace("/* <<color>> */", getColorByLabel(color)),
      );
    }

    if (fileName === "components.json") {
      await fs.mkdir(path.dirname(path.join(projectPath, fileName)), {
        recursive: true,
      });

      await fs.writeFile(
        path.join(projectPath, fileName),
        content.replace("<<style>>", style).replace("<<baseColor>>", color),
      );
    }

    if (fileName === "app/layout.tsx") {
      await fs.mkdir(path.dirname(path.join(projectPath, fileName)), {
        recursive: true,
      });

      if (darkMode) {
        await fs.writeFile(
          path.join(projectPath, fileName),
          content
            .replace(
              "// <<dm-import>>",
              `import { ThemeProvider } from "@/features/dark-mode/theme-provider";`,
            )
            .replace(
              "{/* {children} */}",
              `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>`,
            ),
        );
      } else {
        await fs.writeFile(
          path.join(projectPath, fileName),
          content
            .replace("// <<dm-import>>", "")
            .replace("{/* {children} */}", `{children}`),
        );
      }
    }

    if (fileName.startsWith("features") && darkMode) {
      await fs.mkdir(path.dirname(path.join(projectPath, fileName)), {
        recursive: true,
      });

      await fs.writeFile(path.join(projectPath, fileName), content);
    }
  });

  console.log(templateFiles);
}
