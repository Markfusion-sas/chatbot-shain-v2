import { apiConfig } from '#config/api.config.js';
import axios from 'axios';

export class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setupInterceptors() {
    //Manejo de errores
    this.client.interceptors.response.use(
      response => response.data,
      error => {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status;

        throw new Error(
          JSON.stringify({
            message,
            status,
            isBackendError: true,
            originalError: error,
          })
        );
      }
    );
  }

  //Configurar auth desde la request
  setAuth(req) {
    const cookieFromBrowser = req?.cookies?.token_shain || '';
    const auth = req?.headers?.authorization || '';
    const bearerMatch = auth.match(/^Bearer\s+(.+)/i);

    this.authToken = bearerMatch ? bearerMatch[1] : cookieFromBrowser;
    this.authHeader = auth;

    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token_shain=${this.authToken}`,
      },
    });

    return this;
  }

  get(url, config) {
    return this.client.get(url, config);
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }

  patch(url, data, config) {
    return this.client.patch(url, data, config);
  }

  delete(url, config) {
    return this.client.delete(url, config);
  }
}
