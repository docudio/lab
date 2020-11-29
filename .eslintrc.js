module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'flowtype/no-types-missing-file-annotation': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'no-use-before-define': ['error', { variables: false }],
    'react/jsx-one-expression-per-line': 'off',
    radix: ['error', 'as-needed'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.ts',
          '**/*.stories.tsx',
          '**/*.stories.js',
          '**/*.test.js',
          '**/*.test.ts',
          '**/*.test.tsx',
          'webpack.config.js'
        ]
      }
    ],
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      2,
      {
        singleQuote: true
      }
    ],
    semi: ['error', 'never'],
    quotes: [2, 'single']
  },
  extends: ['plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
