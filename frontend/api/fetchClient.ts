// const BASE_URL = process.env.API_HOST;
const BASE_URL = 'http://localhost:3002';
const API_PREFIX = "/api/v1";

export const fetchClient = (endpoint: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${API_PREFIX}${endpoint}`, options);
};
