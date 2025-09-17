import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lógica para escolher a URL base correta
const baseURL = Platform.OS === 'android' 
    ? 'http://10.0.2.2:8000/api'     // Para o emulador Android
    : 'http://localhost:8000/api';  // Para todo o resto (incluindo a web)

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
  }
});

// --- INTERCEPTOR DE REQUISIÇÃO ---
// Esta função será executada ANTES de CADA requisição
api.interceptors.request.use(
  async (config) => {
    // Tenta pegar o token do armazenamento
    const token = await AsyncStorage.getItem('user_token');

    // Se o token existir, adiciona o cabeçalho de Autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração da requisição para que ela possa continuar
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;