import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Configuración recomendada de ESLint
  js.configs.recommended,

  // Desactiva reglas que conflictúan con Prettier
  prettierConfig,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      // ========================================
      // PRETTIER
      // ========================================
      'prettier/prettier': 'error',

      // ========================================
      // MEJORES PRÁCTICAS
      // ========================================
      // Advierte sobre console.log pero permite console.warn y console.error
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Variables no usadas son error (permite variables que empiezan con _)
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // No permite usar 'var', solo 'let' y 'const'
      'no-var': 'error',

      // Prefiere 'const' sobre 'let' cuando es posible
      'prefer-const': 'error',

      // Prefiere arrow functions en callbacks
      'prefer-arrow-callback': 'error',

      // Prefiere template literals sobre concatenación
      'prefer-template': 'error',

      // Prefiere sintaxis abreviada en objetos
      'object-shorthand': 'error',

      // No reasignar parámetros (permite modificar propiedades)
      'no-param-reassign': ['error', { props: false }],

      // ========================================
      // ES6+ MODERNO
      // ========================================
      // Arrow functions sin llaves cuando es posible
      'arrow-body-style': ['error', 'as-needed'],

      // No permite imports duplicados
      'no-duplicate-imports': 'error',

      // ========================================
      // PREVENCIÓN DE ERRORES
      // ========================================
      // No lanzar literales, solo Error objects
      'no-throw-literal': 'error',

      // Funciones async deben usar await
      'require-await': 'error',

      // No return await innecesario
      'no-return-await': 'error',

      // Siempre usar === en lugar de ==
      eqeqeq: ['error', 'always'],

      // ========================================
      // CALIDAD DE CÓDIGO
      // ========================================
      // Siempre usar llaves en if, for, while, etc.
      curly: ['error', 'all'],

      // Máximo 4 niveles de anidación
      'max-depth': ['warn', 4],

      // Funciones no muy largas (50 líneas)
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // Complejidad ciclomática máxima
      complexity: ['warn', 10],
    },
  },

  // ========================================
  // CONFIGURACIÓN ESPECIAL PARA TESTS
  // ========================================
  {
    files: ['**/*.test.js', '**/*.spec.js', 'test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
      },
    },
    rules: {
      // En tests, permitimos funciones más largas
      'max-lines-per-function': 'off',
    },
  },

  // ========================================
  // ARCHIVOS A IGNORAR
  // ========================================
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.husky/**', '*.min.js'],
  },
];
