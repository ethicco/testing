import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { 
    languageOptions: { 
      globals: { ...globals.browser, ...globals.node, ...globals.jest }, 
      ecmaVersion: 'latest', sourceType: 'module', 
      parser: tseslint
    }
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintPluginJest.configs['flat/recommended'],
  {
    ignores: ["node_modules", "dist", "public"]
  },{
    rules: {
      "jest/no-conditional-expect": 0
    }
  }
] satisfies Linter.Config[];