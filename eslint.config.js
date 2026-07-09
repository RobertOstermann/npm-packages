import { defineConfig } from "eslint/config";

import { baseConfig } from "./packages/eslint-config/dist/index.js";

export default defineConfig([
  {
    extends: [baseConfig],
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
