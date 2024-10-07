import * as e from "execa";

/**
 * Get user package manager.
 * @returns User package manager name (npm, pnpm, yarn, bun).
 */
const getUserPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("yarn")) {
    return "yarn";
  } else if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  } else if (userAgent.startsWith("bun")) {
    return "bun";
  }

  return "npm";
};

/**
 * Get user package manager executables.
 * @returns User package manager executables (yarn dlx, pnpm dlx, bunx --bun).
 */
const getUserPackageManagerExecutables = () => {
  switch (getUserPackageManager()) {
    case "yarn":
      return "yarn dlx";
    case "pnpm":
      return "pnpm dlx";
    case "bun":
      return "bunx --bun";
    default:
      return "npx";
  }
};

/**
 * Get user package manager version.
 * @returns User package manager version.
 */
async function getPackageManagerWithVersion() {
  const { stdout } = await e.execa(getUserPackageManager(), ["-v"]);
  return stdout;
}

const userPackageManager = {
  title: getUserPackageManager(),
  executables: getUserPackageManagerExecutables(),
  version: await getPackageManagerWithVersion(),
};

export default userPackageManager;
