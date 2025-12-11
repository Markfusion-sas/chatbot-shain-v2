import { MovementService } from '#services/api/Movement.service.js';
import { BaseExecutor } from './Base.executor.js';

export class MovementExecutor extends BaseExecutor {
  constructor(req) {
    super();
    this.movement = new MovementService(req);
    this.userId = req.body.userId;
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
          return await this.listMovements(this.userId);
        case 'getSummaryMovements':
          return await this.getSummary(this.userId);
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

  async listMovements(userId) {
    const movement = await this.movement.listByUser(userId);
    return this.handleSuccess(movement, 'Movimientos obtenidos');
  }

  async getSummary(userId) {
    const summary = await this.movement.getSummary(userId);
    return this.handleSuccess(summary, 'Resumen obtenido');
  }
}
