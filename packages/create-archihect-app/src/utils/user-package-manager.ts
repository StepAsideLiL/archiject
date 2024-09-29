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
 * @returns User package manager executables (npx, pnpm dlx, bunx --bun).
 */
const getUserPackageManagerExecutables = () => {
  switch (getUserPackageManager()) {
    case "yarn":
      return "npx";
    case "pnpm":
      return "pnpm dlx";
    case "bun":
      return "bunx --bun";
    default:
      return "npx";
  }
};

const userPackageManager = getUserPackageManager();

export const userPackageManagerExecutables = getUserPackageManagerExecutables();

export default userPackageManager;
