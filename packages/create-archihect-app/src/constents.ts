import path from "path";
import { fileURLToPath } from "url";

export const CURRENT_DIR = process.cwd();

export const PACKAGE_ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../",
);
