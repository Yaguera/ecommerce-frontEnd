import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Adiciona o token JWT automaticamente a todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Supondo que o token esteja armazenado no localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;