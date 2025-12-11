export const bookingsTool = [
  {
    type: 'function',
    function: {
      name: 'listBookings',
      description: 'Obtener reservas de la barberia por filtros de hoy(today), mes(month) y todos(all) con hora, fecha y el nombre del cliente',
      parameters: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            enum: ['today', 'month', 'all'],
            description: 'Filtro (query) del dia, mes o todos de las reservas',
          },
        },
      },
    },
  },
];
