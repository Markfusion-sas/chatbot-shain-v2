import { ApiService } from './Api.service.js';

export class BusinessService {
  constructor(req) {
    this.client = new ApiService().setAuth(req);
  }

  getBusiness(id) {
    return this.client.get(`business/${id}`);
  }
}
