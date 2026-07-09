import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import type { ESLint, Linter } from "eslint";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

import { baseConfig } from "./base.js";

/**
 * ### Base ESLint Configuration
 *
 * This configuration configures ESLint for use in a React project.
 *
 * This eslint config works well with a route alias setup in the `tsconfig.json` file.
 *
 * ```json
 * {
 *   "compilerOptions": {
 *     "paths": {
 *       "@/*": ["./src/*"]
 *     },
 *   }
 * }
 * ```
 *
 * This eslint config expects shadcn components to be in the `src/components/shadcn` directory.
 *
 * ### Usage
 * Create an `eslint.config.js` file in your project:
 *
 * ```js
 * import { defineConfig } from "eslint/config";
 *
 * import { react } from "@ostermann/eslint-config";
 *
 * export default defineConfig({
 *   extends: [react],
 * });
 * ```
 */
export const reactConfig = defineConfig([
  baseConfig,
  // Rules for all ts files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@tanstack/query": tanstackQueryPlugin as unknown as ESLint.Plugin,
      "react-hooks": reactHooksPlugin as unknown as ESLint.Plugin,
    },
    extends: [
      reactPlugin.configs.flat.recommended as Linter.Config,
      reactPlugin.configs.flat["jsx-runtime"] as Linter.Config,
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // @tanstack
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-rest-destructuring": "error",
      "@tanstack/query/no-unstable-deps": "error",
      "@tanstack/query/stable-query-client": "error",
      // react
      "react/display-name": "off",
      "react/jsx-boolean-value": [
        "error",
        "always",
        { assumeUndefinedIsFalse: false },
      ],
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-uses-react": "error",
      "react/no-children-prop": ["error", { allowFunctions: true }],
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",
      // react-hooks
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/react-compiler": "off",
    },
  },
  // Disable filename conventions
  {
    files: [
      "src/main.tsx",
      "src/components/shadcn/**/*",
      "src/types/global/**/*",
    ],
    rules: {
      // check-file
      "check-file/filename-naming-convention": "off",
    },
  },
]);
