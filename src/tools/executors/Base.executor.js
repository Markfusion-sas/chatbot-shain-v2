export class BaseExecutor {
  constructor() {}

  handleSuccess(data, message = 'Operación exitrosa') {
    return {
      success: true,
      message,
      data,
    };
  }

  handleError(error) {
    console.error('[Executor Error]:', error);

    return {
      success: false,
      error: error.message || 'Error desconocido',
      code: error.status || 500,
    };
  }
}
