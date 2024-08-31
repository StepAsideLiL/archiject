import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import { CURRENT_DIR } from "@/src/constents.js";

/**
 * Create the directory structure and copy the files from the template.
 * @param templatePath Path of the template to copy.
 * @param projectName Name of the project. A directory will be created with this name.
 */
export default function createDirectoryContents(
  templatePath: string,
  projectName: string,
) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      if (file === "package.json") {
        const packageJson = fs.readJSONSync(origFilePath) as PackageJson;
        packageJson.name = projectName;

        const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
        fs.writeJsonSync(writePath, packageJson, { spaces: 2 });
      } else {
        const contents = fs.readFileSync(origFilePath, "utf8");

        const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      }
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIR}/${projectName}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${projectName}/${file}`,
      );
    }
  });
}
