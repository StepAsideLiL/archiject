export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

/**
 * Get user package manager.
 * @returns User package manager name (npm, pnpm, yarn, bun).
 */
const userPackageManager = () => {
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

export default userPackageManager;
