import { ApiService } from '#services/api/Api.service.js';

export class MovementService {
  constructor(req) {
    this.client = new ApiService().setAuth(req);
  }

  create(data) {
    return this.client.post('movements', data);
  }

  update(id, data) {
    return this.client.patch(`movements/${id}`, data);
  }

  delete(id) {
    return this.client.delete(`movements/${id}`);
  }

  listByUser(idUser) {
    return this.client.get(`movements/user/${idUser}`);
  }

  getSummary(userId) {
    return this.client.get(`movements/summary/${userId}`);
  }
}
