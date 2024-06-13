import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.jsx"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  ...fixupConfigRules(pluginReactConfig),
];