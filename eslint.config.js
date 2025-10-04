import js from "@eslint/js";
import { configs as ts } from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default [
  {
    ignores: ["dist", "coverage", "**/*.css", "**/*.d.ts", "eslint.config.js"],
  },

  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
  },

  ...ts.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "jsx-a11y/alt-text": "warn",

      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",

      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
    },
  },

  {
    rules: {
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
];
