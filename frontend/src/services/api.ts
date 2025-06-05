// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <- aqui sim!
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
