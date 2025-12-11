import { BookingService } from '#services/api/Booking.service.js';
import { BaseExecutor } from './Base.executor.js';

export class BookingExecutor extends BaseExecutor {
  constructor(req) {
    super();
    this.user = new BookingService(req);
  }

  async execute(toolName, data) {
    try {
      switch (toolName) {
        case 'listBookings':
          return await this.listBookings(data);
        default:
          throw new Error(`Tool desconocida: ${toolName}`);
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  async listBookings(params) {
    const listB = await this.user.listBookings(params);
    return this.handleSuccess(listB, 'Reservas obtenidas');
  }
}
