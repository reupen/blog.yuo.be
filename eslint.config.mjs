// @ts-check

import eslint from "@eslint/js"
import eslintPluginAstro from "eslint-plugin-astro"
import * as eslintPluginMdx from "eslint-plugin-mdx"
import perfectionist from "eslint-plugin-perfectionist"
import reactPlugin from "eslint-plugin-react"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config({
  ignores: [".astro/", "dist/", "src/env.d.ts"],
  extends: [
    {
      files: ["astro.config.mjs"],
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    {
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
          },
        ],
      },
    },
    eslintPluginAstro.configs.recommended,
    {
      files: ["**/*.{mdx,tsx}"],
      ...reactPlugin.configs.flat.recommended,
    },
    {
      settings: {
        react: {
          version: "detect",
        },
      },
      ...reactPlugin.configs.flat["jsx-runtime"],
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
              ["internal-type", "internal"],
              [
                "parent-type",
                "sibling-type",
                "index-type",
                "parent",
                "sibling",
                "index",
              ],
              "object",
              "unknown",
            ],
          },
        ],
        "perfectionist/sort-jsx-props": [
          "error",
          {
            customGroups: {
              prioritised: ["^(client|is):", "^(id|name|property|src)$"],
            },
            groups: ["prioritised", "unknown", "shorthand"],
          },
        ],
      },
    },
  ],
})
