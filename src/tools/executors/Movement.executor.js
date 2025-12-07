import { MovementService } from '#/services/api/Movement.service.js';
import { BaseExecutor } from './Base.executor.js';

export class MovementExecutor extends BaseExecutor {
  constructor(req) {
    super();
    this.movement = new MovementService(req);
  }

  async execute(toolName, data) {
    try {
      switch (toolName) {
        case 'addMovement':
          return await this.addMovement(data);
        case 'updateMovement':
          return await this.updateMovement(data);
        case 'deleteMovement':
          return await this.deleteMovement(data);
        case 'listMovements':
          return await this.listMovements(data);
        case 'getSummary':
          return await this.getSummary(data);
        default:
          throw new Error(`Tool desconocida: ${toolName}`);
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addMovement(data) {
    const newMovement = await this.movement.create(data);
    return this.handleSuccess(newMovement, 'Movimiento creado exitosamente');
  }

  async updateMovement(data) {
    const { id, ...restData } = data;
    const updatedMovement = await this.movement.update(id, restData);
    return this.handleSuccess(updatedMovement, 'Movimiento actualizado correctamente');
  }

  async deleteMovement(data) {
    await this.movement.delete(data.id);
    return this.handleSuccess(null, 'Movimiento eliminado exitosamente');
  }

  async listMovements(data) {
    const movement = await this.movement.listByUser(data.idUser);
    return this.handleSuccess(movement, 'Movimientos obtenidos');
  }

  async getSummary(data) {
    const summary = await this.movement.getSummary(data.idUser);
    return this.handleSuccess(summary, 'Resumen obtenido');
  }
}
