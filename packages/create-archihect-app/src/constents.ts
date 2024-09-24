import path from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = process.cwd();

const PACKAGE_ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../",
);

const TEMPLATE_DIR = path.join(PACKAGE_ROOT_DIR, "templates");

const NEXT_TEMPLATE_DIR = path.join(TEMPLATE_DIR, "nextjs");

/**
 * Path of specific directories.
 */
export const directories = {
  CURRENT_DIR,
  PACKAGE_ROOT_DIR,
  TEMPLATE_DIR,
  NEXT_TEMPLATE_DIR,
};

/**
 * Specific version of the packages.
 */
export const packageVersions = {
  next: "14.2.13",
  nextPeerReact: "^18",
  typescript: "^5",
  nodeTypes: "^20",
  postCss: "^8",
  tailwindCss: "^3.4.1",
  eslint: "^8",
};
