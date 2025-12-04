Node.js Project Base
Configuración base moderna y escalable para proyectos Node.js con ESLint, Prettier, Testing y más.
📋 Características

✅ ESM (ES Modules) - Uso de import/export moderno
✅ ESLint - Linting con configuración moderna (Flat Config)
✅ Prettier - Formateo de código consistente
✅ Testing - Node.js Test Runner nativo con cobertura c8
✅ Husky & Lint-staged - Pre-commit hooks
✅ Path aliases - Imports organizados con jsconfig.json

🚀 Instalación
bash# Instalar dependencias
npm install

# Inicializar Husky (hooks de git)
npm run prepare
📁 Estructura del Proyecto
.
├── src/
│   ├── config/          # Configuraciones
│   ├── controllers/     # Controladores
│   ├── models/          # Modelos de datos
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades
│   └── index.js         # Punto de entrada
├── test/                # Tests
├── .env.example         # Variables de entorno ejemplo
├── .c8rc.json          # Configuración de cobertura
├── eslint.config.js    # Configuración ESLint
├── jsconfig.json       # Path aliases y configs JS
└── package.json
🛠️ Scripts Disponibles
Desarrollo
bashnpm run dev          # Ejecuta con --watch (recarga automática)
npm start           # Ejecuta la aplicación
Testing
bashnpm test                # Ejecuta todos los tests
npm run test:watch      # Ejecuta tests en modo watch
npm run test:coverage   # Ejecuta tests con reporte de cobertura
Linting y Formateo
bashnpm run lint            # Verifica código con ESLint
npm run lint:fix        # Corrige automáticamente problemas de ESLint
npm run format          # Formatea código con Prettier
npm run format:check    # Verifica formateo sin modificar
🧪 Testing
Este proyecto usa el Test Runner nativo de Node.js (disponible desde Node 20+).
Ejemplo de test:
javascript// test/example.test.js
import { test } from 'node:test';
import assert from 'node:assert';

test('suma de dos números', () => {
  assert.strictEqual(2 + 2, 4);
});

test('operación asíncrona', async () => {
  const result = await Promise.resolve(42);
  assert.strictEqual(result, 42);
});
Cobertura de código
La cobertura se configura en .c8rc.json con los siguientes umbrales:

Líneas: 80%
Funciones: 80%
Ramas: 75%
Statements: 80%

🎯 Path Aliases
Usa imports limpios configurados en jsconfig.json:
javascript// En lugar de:
import { helper } from '../../../utils/helper.js';

// Usa:
import { helper } from '@utils/helper.js';
Aliases disponibles:

@/* → src/*
@config/* → src/config/*
@utils/* → src/utils/*
@services/* → src/services/*
@models/* → src/models/*
@controllers/* → src/controllers/*

🔧 Variables de Entorno

Copia .env.example a .env
Configura tus variables de entorno
Nunca commitees el archivo .env

📝 Convenciones de Código

Usa const por defecto, let solo cuando sea necesario
Prefiere arrow functions
Usa template literals para strings
Nombres de variables descriptivos en camelCase
Nombres de constantes globales en UPPER_SNAKE_CASE
Funciones pequeñas y con una sola responsabilidad

🤝 Pre-commit Hooks
Husky y lint-staged se ejecutan automáticamente antes de cada commit:

ESLint corrige problemas automáticamente
Prettier formatea el código
Solo se procesan archivos staged

📦 Actualizar Dependencias
bash# Ver dependencias desactualizadas
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar a última versión (incluso major)
npx npm-check-updates -u
npm install
🔒 Requisitos

Node.js >= 20.0.0

📄 Licencia
MIT