/** @type {import('prettier').Config} */
module.exports = {
  // Basic formatting rules
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  printWidth: 150,
  tabWidth: 2,
  trailingComma: "es5",

  // Tailwind CSS related configurations
  tailwindFunctions: ["clsx", "cva", "cn"],

  // Import related configurations
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],

  // Prettier plugins
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],

  // File specific rules
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
}
