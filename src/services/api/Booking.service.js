import { ApiService } from '#services/api/Api.tpm.js';

export class BookingService {
  constructor(req) {
    this.client = new ApiService().setAuth(req);
  }

  listBookings(params) {
    return this.client.get('bookings', {
      params,
    });
  }
}
