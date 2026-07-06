import { defineConfig } from "eslint/config";
import i18next from "eslint-plugin-i18next";

import { commonIgnores } from "../utilities/utilities.js";

/**
 * ### i18next ESLint Configuration
 *
 * This configuration configures ESLint for use in project
 * with an i18next setup.
 */
export const i18nextConfig = defineConfig([
  commonIgnores,
  i18next.configs["flat/recommended"],
]);
