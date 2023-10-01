/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  // "root": true,
  parserOptions: {
    project: true,
    // project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "tailwindcss"],
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  settings: {
    // next: {
    //   rootDir: ["./"],
    // },
    tailwindcss: {
      callees: ["clsx", "cva", "cn"],
      config: "tailwind.config.ts",
    },
  },
  rules: {
    // t3 rules
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    // old overrides
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        next: "block",
        prev: "*",
      },
      {
        blankLine: "always",
        next: "*",
        prev: "block",
      },
      {
        blankLine: "always",
        next: "block-like",
        prev: "*",
      },
      {
        blankLine: "always",
        next: "*",
        prev: "block-like",
      },
    ],
  },
}

module.exports = config
