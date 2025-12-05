import { API_BASE_URL } from './env.config.js';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  retires: 3,
  endpoints: {
    movements: '/api/movements',
  },
};
