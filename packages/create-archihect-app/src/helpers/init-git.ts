import * as e from "execa";

/**
 * Initial and commit the project to git.
 * @param projectPath Path of the project directory.
 */
export default async function initGit(projectPath: string) {
  await e.execa("git", ["init"], {
    cwd: projectPath,
  });

  await e.execa("git", ["add", "."], {
    cwd: projectPath,
  });

  await e.execa(
    "git",
    ["commit", "-m", "Initial commit from Create Archiject App"],
    {
      cwd: projectPath,
    },
  );
}
