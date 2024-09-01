import js from "@eslint/js";
import nuxt from "eslint-plugin-nuxt";
import prettier from "eslint-plugin-prettier";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.js", "**/*.vue"],
    ...pluginVue.configs["flat/recommended"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      nuxt,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nuxt.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
    },
  },
];
