// Configuración básica de ESLint sin opciones problemáticas
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Reglas básicas para mantener el código limpio
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];
