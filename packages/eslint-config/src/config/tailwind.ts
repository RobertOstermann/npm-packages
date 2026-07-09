import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";

import { commonIgnores } from "../utilities/utilities.js";

interface TailwindProps {
  /** The entry point for the Tailwind CSS stylesheet. @default "src/styles/tailwind.css" */
  entryPoint?: string;
  /** The path to the Tailwind CSS configuration file. */
  tailwindConfig?: string;
}

/**
 * ### Tailwind ESLint Configuration
 *
 * This configuration configures ESLint for use in project
 * with a Tailwind setup.
 *
 * This eslint config expects the tailwind stylesheet to be located at `src/styles/tailwind.css`.
 * The stylesheet or tailwind config can be customized.
 *
 * ### Usage
 * Create an `eslint.config.js` file in your project:
 *
 * ```js
 * import { defineConfig } from "eslint/config";
 *
 * import { baseConfig, tailwindConfig } from "@ostermann/eslint-config";
 *
 * export default defineConfig({
 *   extends: [baseConfig, tailwindConfig({ entryPoint: "src/styles/tailwind.css" })],
 * });
 * ```
 *
 * @param props - Optional Tailwind configuration options.
 */
export const tailwindConfig = (props?: TailwindProps): Linter.Config[] =>
  defineConfig([
    commonIgnores,
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        "better-tailwindcss": tailwindPlugin,
      },
      settings: {
        react: {
          version: "detect",
        },
        "better-tailwindcss": props ?? {
          entryPoint: "src/styles/tailwind.css",
        },
      },
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        // better-tailwindcss
        "better-tailwindcss/enforce-consistent-variable-syntax": "error",
        "better-tailwindcss/enforce-shorthand-classes": "error",
      },
    },
  ]);
