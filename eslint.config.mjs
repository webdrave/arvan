import next from "@next/eslint-plugin-next";

export default [
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      // Add custom rules here
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Add TypeScript-specific rules here
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "no-console": "off"
    },
  },
];