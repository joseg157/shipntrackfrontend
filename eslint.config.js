import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tanstackPlugin from '@tanstack/eslint-plugin-query';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // ========================
      // CORE JAVASCRIPT RULES
      // ========================
      js.configs.recommended,
      /* 
        Provides ESLint's built-in recommended rules for JavaScript
        - Enforces best practices like no-unused-vars, no-dupe-keys, etc.
        - Base set of rules that catch common JavaScript problems
      */

      // ========================
      // REACT RULES
      // ========================
      reactPlugin.configs.flat.recommended,
      /* 
        React-specific recommended rules from eslint-plugin-react
        - Enforces React best practices and prevents common errors
        - Rules like: react/jsx-key (missing key prop), react/no-direct-mutation-state
        - React component lifecycle and prop validation rules
      */

      reactPlugin.configs.flat['jsx-runtime'],
      /* 
        Essential for React 17+ with the new JSX Transform
        - Disables rules that require React to be in scope when using JSX
        - Required when using the automatic JSX runtime (no need to import React)
        - Compatible with Vite, Create React App, and modern React setups
      */

      // ========================
      // IMPORT/EXPORT RULES
      // ========================
      importPlugin.flatConfigs.recommended,
      /* 
        Rules for ES6+ import/export syntax
        - Validates import paths and file extensions
        - Prevents missing file/directory errors in imports
        - Ensures proper module resolution and dependency management
      */

      importPlugin.flatConfigs.typescript,
      /* 
        TypeScript-specific import rules
        - Extends import rules to work with TypeScript features
        - Understands .ts/.tsx extensions and TypeScript path mapping
        - Resolves TypeScript type imports and exports correctly
      */

      // ========================
      // TYPESCRIPT RULES
      // ========================
      tseslint.configs.recommended,
      /* 
        TypeScript ESLint with type checking enabled
        - Requires TypeScript compiler for advanced type-aware rules
        - Rules like: @typescript-eslint/no-floating-promises (requires await)
        - @typescript-eslint/no-misused-promises (prevents promise misuse)
        - More powerful than recommended (without type checking) but slower
      */

      // ========================
      // REACT HOOKS RULES
      // ========================
      reactHooks.configs['recommended-latest'],
      /* 
        Rules of Hooks from react-hooks/eslint-plugin
        - Enforces Rules of Hooks: https://reactjs.org/docs/hooks-rules.html
        - Prevents conditional hook calls and ensures proper hook dependencies
        - recommended-latest uses the most up-to-date version of the rules
      */

      // ========================
      // REACT FAST REFRESH (HMR)
      // ========================
      reactRefresh.configs.vite,
      /* 
        React Fast Refresh rules for Vite
        - Specifically designed for Vite's React Refresh implementation
        - Enforces constraints needed for proper Hot Module Replacement
        - The only-export-components rule ensures Fast Refresh works correctly
      */

      // ========================
      // TANSTACK QUERY RULES
      tanstackPlugin.configs['flat/recommended'],
      /*
        Tanstack Query specific linting rules
        - Enforces best practices when using React Query
        - Rules like: query/exhaustive-deps (ensures query dependencies are correct)
        - Helps catch common mistakes with query keys and mutation usage
      */

      // ========================
      // ACCESSIBILITY RULES
      // ========================
      // NOTE: You should add this line to include JSX accessibility rules
      jsxA11y.flatConfigs.recommended,
      /* 
        Accessibility rules for JSX (RECOMMENDED TO ADD)
        - Catches common accessibility issues in JSX elements
        - Rules like: jsx-a11y/alt-text (missing alt attributes)
        - jsx-a11y/aria-props (invalid ARIA attributes)
        - jsx-a11y/interactive-supports-focus (focus management)
        - Helps make your React app more accessible by default
      */

      // ========================
      // PRETTIER RULES
      // ========================
      prettierPlugin,
      /*
        Integrates Prettier with ESLint
        - Displays Prettier formatting issues as ESLint errors/warnings
        - Ensures code style consistency alongside ESLint rules
        - Must be last in the extends array to override other formatting rules
      */
    ],

    settings: {
      react: { version: 'detect' }, // Auto-detects React version from package.json
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json', // Tells import plugin where to find TypeScript config
        },
      },
    },

    languageOptions: {
      ecmaVersion: 2020, // ES2020 features enabled
      globals: globals.browser, // Browser globals like window, document, etc.

      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'], // TypeScript projects for type-aware rules
        tsconfigRootDir: import.meta.dirname, // Root directory for tsconfig resolution
      },
    },

    rules: {
      // ========================
      // CUSTOM RULE OVERRIDES
      // ========================

      // React Refresh: Only warn about non-component exports (allows constants)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // React: Only allow JSX in .tsx files
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

      // React: Allow prop spreading (common in modern React)
      'react/jsx-props-no-spreading': 'off',

      // React: Not needed with TypeScript
      'react/require-default-props': 'off', // TypeScript handles prop types
      'react/prop-types': 'off', // TypeScript handles prop validation

      // General: Warn on console statements (good for production)
      'no-console': 'warn',

      // Import: Modern preferences
      'import/prefer-default-export': 'off', // Allow named exports
      'import/no-named-default': 'off', // Allow importing default as named
      'import/extensions': 'off', // Allow omitting extensions in imports

      // TypeScript: Allow empty interfaces/objects (common for future expansion)
      '@typescript-eslint/no-empty-object-type': 'off',

      // TypeScript: Strict unused vars with ignore patterns
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_', // Ignore variables starting with _
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_', // Ignore error variables starting with _
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: false, // Don't ignore rest siblings
        },
      ],
    },
  },
]);
