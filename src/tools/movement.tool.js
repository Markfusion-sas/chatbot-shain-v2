export const movementsTool = [
  {
    type: 'function',
    function: {
      name: 'addMovement',
      description: 'Crea un nuevo movimiento financiero (ingreso o egreso) con fecha, valor, tipo cliente ( nuevo o recurrente ) y descripción.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['ingreso', 'egreso'],
            description: 'Tipo de movimiento',
          },
          frecuencyType: {
            type: 'string',
            enum: ['nuevo', 'recurrente'],
            description: 'Si es un movimiento nuevo o recurrente',
          },
          value: {
            type: 'string',
            description: 'Valor númerico del movimiento',
          },
          description: {
            type: 'string',
            description: 'Descripción del movimiento',
          },
          date: {
            type: 'string',
            description: 'Fecha en formato ISO o texto como "hoy"',
          },
          meta: {
            type: 'object',
            description: 'Metadatos adicionales',
          },
        },
        required: ['type', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'updateMovement',
      description: 'Actualiza un movimiento existente por su ID',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID del movimiento' },
          value: { type: 'string', description: 'Nuevo valor' },
          description: { type: 'string', description: 'Nueva descripción' },
          frecuencyType: { type: 'string', enum: ['nuevo', 'recurrente'] },
          date: { type: 'string', description: 'Nueva fecha' },
          type: { type: 'string', enum: ['ingreso', 'egreso'] },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'deleteMovement',
      description: 'Elimina un movimiento por su ID.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID del movimiento a eliminar' },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'listMovements',
      description: 'Lista movimientos con filtros opcionales.',
      parameters: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['ingreso', 'egreso'] },
          limit: { type: 'number', description: 'Límite de resultados' },
          from: { type: 'string', description: 'Fecha desde' },
          to: { type: 'string', description: 'Fecha hasta' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getSummary',
      description: 'Obtiene un resumen financiero con totales de ingresos y egresos.',
      parameters: {
        type: 'object',
        properties: {
          date: { type: 'string', description: 'Fecha en formato YYYY-MM' },
          from: { type: 'string', description: 'Fecha desde' },
          to: { type: 'string', description: 'Fecha hasta' },
        },
      },
    },
  },
];
