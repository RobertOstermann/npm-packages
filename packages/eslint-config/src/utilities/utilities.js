import { globalIgnores } from "eslint/config";

export const commonIgnores = globalIgnores(["node_modules", "dist", "scripts"]);
