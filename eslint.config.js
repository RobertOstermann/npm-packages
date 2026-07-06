import { defineConfig } from "eslint/config";

import {
  baseConfig,
  tailwindConfig,
} from "./packages/eslint-config/src/index.js";

export default defineConfig([
  {
    extends: [baseConfig, tailwindConfig()],
  },
  // Allow default exports
  {
    files: ["**/*"],
    rules: {
      "check-file/filename-naming-convention": "off",
      "import/no-default-export": "off",
      "no-relative-import-paths/no-relative-import-paths": "off",
    },
  },
]);
