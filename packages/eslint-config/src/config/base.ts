import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import checkFilePlugin from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import packageJsonPlugin from "eslint-plugin-package-json";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

import { commonIgnores } from "../utilities/utilities.js";

/**
 * ### Base ESLint Configuration
 *
 * This configuration configures ESLint for use in a TypeScript project.
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
 * import { baseConfig } from "@ostermann/eslint-config";
 *
 * export default defineConfig({
 *   extends: [baseConfig],
 * });
 * ```
 */
export const baseConfig = defineConfig([
  commonIgnores,
  eslint.configs.recommended,
  prettierPluginRecommended,
  // Rules for package.json files
  {
    extends: [
      packageJsonPlugin.configs.recommended,
      packageJsonPlugin.configs.stylistic,
    ],
    files: ["**/package.json"],
    rules: {
      "package-json/require-files": "off",
      "package-json/require-sideEffects": "off",
    },
  },
  // Rules for all js/ts files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      // @ts-ignore
      "no-relative-import-paths": noRelativeImportPaths,
      "simple-import-sort": simpleImportSortPlugin,
      import: importPlugin,
    },
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      // import
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-default-export": "error",
      "import/no-duplicates": "error",
      "import/no-empty-named-blocks": "error",
      // no-relative-import-paths
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],
      // simple-import-sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  // Rules for all ts files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "check-file": checkFilePlugin,
      import: importPlugin,
    },
    extends: [tseslint.configs.eslintRecommended, tseslint.configs.recommended],
    settings: {
      "import/resolver": {
        typescript: {},
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // typescript-eslint
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],
      // "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      // check-file
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{jsx,tsx}": "PASCAL_CASE",
          "**/*.{js,ts}": "CAMEL_CASE",
        },
        {
          errorMessage:
            'The filename "{{ target }}" does not match the "{{ pattern }}" pattern. See the README for details',
          ignoreMiddleExtensions: true,
        },
      ],
      // import
      "import/no-cycle": [
        "error",
        {
          maxDepth: 10,
          ignoreExternal: true,
        },
      ],
      // tsdoc
      "tsdoc/syntax": "off",
      // other
      eqeqeq: "error",
      "no-prototype-builtins": "off",
      // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",
      "no-shadow": "off",
      "prefer-const": "warn",
    },
  },
  // Disable filename conventions
  {
    files: ["**/codegen/**/*", "**/*.d.ts"],
    rules: {
      // check-file
      "check-file/filename-naming-convention": "off",
    },
  },
  // Allow default exports
  {
    files: ["eslint.config.*", "src/types/global/**/*", "**/codegen/**/*"],
    rules: {
      // import
      "import/no-default-export": "off",
    },
  },
]);
