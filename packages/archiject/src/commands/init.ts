import { input } from "@inquirer/prompts";
import { Command } from "commander";
import z from "zod";
import createNextjsProject from "@/helpers/create-nextjs-project.js";

const initOptionSchema = z.string().optional();

/**
 * init command to initialize a new nextjs project.
 */
export const init = new Command()
  .name("init")
  .description("Initialize a new project")
  .argument("[name]", "Project name and directory")
  .action((name) => {
    const projectName = initOptionSchema.parse(name);

    if (projectName && projectName !== "") {
      createNextjsProject(projectName);
    } else {
      input({
        message: "Project name",
        default: "my-archiject-project",
        validate: (input: string) => {
          if (/^([A-Za-z\-\\_\d])+$/.test(input)) {
            return true;
          } else {
            return "Project name may only include letters, numbers, underscores and hashes.";
          }
        },
      }).then((answer) => {
        createNextjsProject(answer);
      });
    }
  });
