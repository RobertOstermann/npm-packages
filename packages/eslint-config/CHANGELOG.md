# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.0.8] - 2026-07-09

- Mark some `peerDependencies` as `optional`

## [0.0.7] - 2026-07-09

- Migrate config files to TypeScript for automatic type generation.
- Add `tsconfig.json` to generate `.d.ts` declaration files on build.
- Separate React-specific rules into a dedicated `reactConfig`.
- Remove React, React Hooks, and TanStack Query rules from `baseConfig` to make it usable in non-React projects.
- Move `ecmaFeatures.jsx` and `react` settings from `baseConfig` to `reactConfig`.

## [0.0.6] - 2026-03-18

- Update [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh/releases/tag/v0.5.0)
  rules to avoid showing errors for TanStackRouter components.

## [0.0.5] - 2026-03-18

- Add [eslint-plugin-package-json](https://github.com/michaelfaith/eslint-plugin-package-json) to the `baseConfig`.

## [0.0.4] - 2025-12-30

- Fix `import/no-cycle` rule. Only apply it to TypeScript files.

## [0.0.3] - 2025-12-30

- Add [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) to the `tanstackRouterConfig`

## [0.0.2] - 2025-10-27

- Correctly disable the `router.tsx` file in `tanstackRouterConfig`

## [0.0.1] - 2025-10-27

- INITIAL RELEASE
