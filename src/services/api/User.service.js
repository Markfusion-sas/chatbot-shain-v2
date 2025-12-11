import { ApiService } from './Api.service.js';

export class UserService {
  constructor(req) {
    this.client = new ApiService().setAuth(req);
  }

  listUsersBusiness() {
    return this.client.get('users/business');
  }
}
