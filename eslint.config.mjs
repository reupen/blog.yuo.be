// @ts-check

import eslintReact from "@eslint-react/eslint-plugin"
import eslint from "@eslint/js"
import eslintPluginAstro from "eslint-plugin-astro"
import * as eslintPluginMdx from "eslint-plugin-mdx"
import perfectionist from "eslint-plugin-perfectionist"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig(
  globalIgnores([".astro/", "dist/", "src/env.d.ts"]),
  {
    files: ["**/*.mdx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    files: ["astro.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  {
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  tseslint.configs.stylistic,
  eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{mdx,tsx}"],
    ...eslintReact.configs["recommended-typescript"],
  },
  eslintPluginMdx.flat,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-interfaces": "error",
      "perfectionist/sort-exports": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          internalPattern: ["^@/"],
          groups: [
            ["type", "builtin", "external"],
            ["type-internal", "internal"],
            [
              "type-parent",
              "type-sibling",
              "type-index",
              "parent",
              "sibling",
              "index",
            ],
            "unknown",
          ],
          type: "natural",
        },
      ],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          customGroups: [
            {
              groupName: "prioritised",
              elementNamePattern: ["^(client|is):", "^(id|name|property|src)$"],
            },
          ],
          groups: ["prioritised", "unknown", "shorthand-prop"],
        },
      ],
    },
  },
)
