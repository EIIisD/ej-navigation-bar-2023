/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  printWidth: 150,
  tabWidth: 2,
  trailingComma: "es5",
  tailwindFunctions: ["clsx", "cva", "cn"],
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
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
}
