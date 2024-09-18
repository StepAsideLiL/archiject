import path from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = process.cwd();

const PACKAGE_ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../",
);

const constents = {
  CURRENT_DIR,
  PACKAGE_ROOT_DIR,
};

export default constents;
