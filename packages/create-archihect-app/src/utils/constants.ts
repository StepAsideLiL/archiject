import path from "path";
import { fileURLToPath } from "url";

/**
 * Current directory of the user's project.
 */
const CURRENT_DIR = process.cwd();

/**
 * Path of the package root directory.
 */
const PACKAGE_ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../",
);

/**
 * Path of the template directory.
 */
const TEMPLATE_DIR = path.join(PACKAGE_ROOT_DIR, "templates");

/**
 * Path of the Nextjs template directory.
 */
const NEXT_TEMPLATE_DIR = path.join(TEMPLATE_DIR, "nextjs");

/**
 * Path of the Turborepo template directory.
 */
const TURBO_TEMPLATE_DIR = path.join(TEMPLATE_DIR, "turbo");

/**
 * Path of specific directories.
 */
export const directories = {
  CURRENT_DIR,
  PACKAGE_ROOT_DIR,
  TEMPLATE_DIR,
  NEXT_TEMPLATE_DIR,
  TURBO_TEMPLATE_DIR,
};

/**
 * Specific version of the packages.
 */
export const packageVersions = {
  next: "14.2.15",
  nextPeerReact: "^18",
  typescript: "^5",
  nodeTypes: "^20",
  postCss: "^8",
  tailwindCss: "^3.4.1",
  eslint: "^8",
};
