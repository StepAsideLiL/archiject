import * as e from "execa";

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
