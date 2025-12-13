import { BusinessService } from '#services/api/Business.service.js';
import { BaseExecutor } from './Base.executor.js';

export class BusinessExecutor extends BaseExecutor {
  constructor(req) {
    super();
    this.business = new BusinessService(req);
    this.id = req.body.businessId;
  }

  async execute(toolName, data) {
    try {
      switch (toolName) {
        case 'getBusiness':
          return await this.getBusiness(this.id);
        default:
          throw new Error(`Tool desconocida: ${toolName}`);
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBusiness(id) {
    const business = await this.business.getBusiness(id);
    return this.handleSuccess(business, 'Reservas obtenidas');
  }
}
