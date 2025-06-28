import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJSXA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import parserTs from "@typescript-eslint/parser";
import pluginUnusedImports from "eslint-plugin-unused-imports";

import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJSXA11y,
      prettier: pluginPrettier,
      "simple-import-sort": pluginSimpleImportSort,
      "react-refresh": pluginReactRefresh,
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      'unused-imports/no-unused-imports': 'warn',
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React & packages
            ["^react", "^@?\\w"],
            // Context, Hooks, Utils, Types, etc.
            ["^@(contexts|hooks|customTypes|utils|reducers)(/.*|$)"],
            // UI components
            ["^@(components|layout|pages)(/.*|$)"],
            // Side effects
            ["^\\u0000"],
            // Parent imports then same folder
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Assets & styles
            ["^@assets(/.*|$)"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: [],
  },
]);
