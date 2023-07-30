module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    extends: ['prettier', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers', 'prettier'],
    rules: {
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        camelcase: 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'no-shadow': 'off',
        'no-console': 'off',
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'lines-between-class-members': 'off',
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'always',
                groups: [
                    'module',
                    '/^@shared/',
                    ['parent', 'sibling', 'index'],
                ],
                alphabetize: {
                    order: 'asc',
                    ignoreCase: true,
                },
            },
        ],
        'prettier/prettier': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
