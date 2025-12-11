import { UserService } from '#services/api/User.service.js';
import { BaseExecutor } from './Base.executor.js';

export class UserExecutor extends BaseExecutor {
  constructor(req) {
    super();
    this.user = new UserService(req);
  }

  async execute(toolName, data) {
    try {
      switch (toolName) {
        case 'listUsersBusiness':
          return await this.listUsersBusiness();
        default:
          throw new Error(`Tool desconocida: ${toolName}`);
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  async listUsersBusiness() {
    const listUsers = await this.user.listUsersBusiness();
    return this.handleSuccess(listUsers, 'Usuarios obtenidos');
  }
}
