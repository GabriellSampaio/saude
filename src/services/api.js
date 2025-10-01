import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = Platform.OS === 'android' 
    ? 'http://10.0.2.2:8000/api'     
    : 'http://localhost:8000/api';  

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  async (config) => {
   
    const token = await AsyncStorage.getItem('user_token');

    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;