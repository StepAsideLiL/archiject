import { getColorByLabel } from "@/utils/contents/colors.js";
import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";
import { type Options } from "@/schema.js";

/**
 * Creates files and directory from Nextjs options template directory.
 * @param templatePath Path of the template directory.
 * @param projectPath Path of the project directory.
 * @param options Options for the project.
 * @param ignore Array of patterns to ignore files.
 */
export default async function createFilesFromNextjsOptionsTemplate(
  templatePath: string,
  projectPath: string,
  options: Options,
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

    const copyPath =
      options.src &&
      (fileName.startsWith("lib") ||
        fileName.startsWith("app") ||
        fileName.startsWith("features"))
        ? path.join(projectPath, "src")
        : projectPath;

    await fs.mkdir(path.dirname(path.join(copyPath, fileName)), {
      recursive: true,
    });

    options.src &&
    (fileName.startsWith("lib") ||
      fileName.startsWith("app") ||
      fileName.startsWith("features"))
      ? path.join(projectPath, "src")
      : projectPath;

    // components.json
    if (fileName === "components.json") {
      await fs.writeFile(
        path.join(projectPath, fileName),
        content
          .replace("<<style>>", options.style)
          .replace("<<baseColor>>", options.color)
          .replace(
            "<<css>>",
            options.src ? "src/app/globals.css" : "app/globals.css",
          )
          .replaceAll("@", options.importAlias),
      );
    }

    // tailwind.config.ts
    if (fileName === "tailwind.config.ts") {
      await fs.writeFile(
        path.join(projectPath, fileName),
        content.replace(
          `// <<content>>`,
          options.src
            ? `"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",`
            : `"./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",`,
        ),
      );
    }

    // tsconfig.json
    if (fileName === "tsconfig.json") {
      await fs.writeFile(
        path.join(projectPath, fileName),
        content
          .replace("@/*", `${options.importAlias}/*`)
          .replace("./*", options.src ? "./src/*" : "./*"),
      );
    }

    // app/globals.css
    if (fileName === "app/globals.css") {
      await fs.writeFile(
        path.join(copyPath, fileName),
        content.replace("/* <<color>> */", getColorByLabel(options.color)),
      );
    }

    // app/layout.tsx
    if (fileName === "app/layout.tsx") {
      if (options.darkMode) {
        await fs.writeFile(
          path.join(copyPath, fileName),
          content
            .replace(
              "// <<dm-import>>",
              `import { ThemeProvider } from "@/features/dark-mode/theme-provider";`.replace(
                "@/",
                `${options.importAlias}/`,
              ),
            )
            .replace(
              "{/* {children} */}",
              `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>`,
            )
            .replaceAll("@/", `${options.importAlias}/`),
        );
      } else {
        await fs.writeFile(
          path.join(copyPath, fileName),
          content
            .replace("// <<dm-import>>", "")
            .replace("{/* {children} */}", `{children}`),
        );
      }
    }

    // app/page.tsx
    if (fileName === "app/page.tsx") {
      await fs.writeFile(path.join(copyPath, fileName), content);
    }

    // lib/*
    if (fileName.startsWith("lib")) {
      /\.(tsx|ts|css|mjs|md|json|mdx)$/.test(fileName)
        ? await fs.writeFile(path.join(copyPath, fileName), content)
        : await fs.copyFile(templateFilePath, path.join(copyPath, fileName));
    }

    // dark-mode
    if (
      (fileName.startsWith("features") || fileName.startsWith("components")) &&
      options.darkMode
    ) {
      await fs.writeFile(path.join(copyPath, fileName), content);
    }
  });
}
