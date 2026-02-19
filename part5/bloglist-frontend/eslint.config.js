import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            // indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            eqeqeq: 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-console': 'off',
        },
    },
]
// import js from '@eslint/js'
// import globals from 'globals'
// import stylistic from '@stylistic/eslint-plugin'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//     { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
//     {
//         files: ['**/*.{js,mjs,cjs}'],
//         languageOptions: { globals: globals.node },
//         plugins: { js, stylistic },
//         extends: ['js/recommended'],
//         rules: {
//             eqeqeq: 'error',
//             'no-trailing-spaces': ['error'],
//             'object-curly-spacing': ['error', 'always'],
//             'no-console': 0,
//             'space-before-function-paren': [
//                 'error',
//                 {
//                     anonymous: 'always',
//                     named: 'always',
//                     asyncArrow: 'always',
//                 },
//             ],
//             'stylistic/indent': ['error', 4],
//             'no-unused-vars': ['error'],
//             'no-undef': ['error'],
//         },
//     },
//     globalIgnores(['./dist/']),
// ])
