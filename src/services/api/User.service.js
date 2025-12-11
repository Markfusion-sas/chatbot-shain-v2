import { ApiService } from '#services/api/Api.tpm.js';

export class UserService {
  constructor(req) {
    this.client = new ApiService().setAuth(req);
  }

  listUsersBusiness() {
    return this.client.get('users/business');
  }
}
