module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:astro/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    {
      files: ["*.mdx"],
      extends: ["plugin:mdx/recommended"],
      rules: {
        "react/jsx-uses-vars": "error",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "perfectionist"],
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
}
