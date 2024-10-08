import path from "path";
import { fileURLToPath } from "url";

export const CURRENT_WORKING_DIR = process.cwd();

export const PACKAGE_ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../",
);

export const NEXTJS_TEMPLATE_PATH = `${PACKAGE_ROOT_DIR}/templates/nextjs-with-src/files`;

export const directories = {
  CURRENT_WORKING_DIR,
  PACKAGE_ROOT_DIR,
  NEXTJS_TEMPLATE_PATH,
};
