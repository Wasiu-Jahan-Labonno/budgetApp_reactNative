// src/plugins/Axios.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API = axios.create({
//   baseURL: 'http://10.0.2.2:8000/api', // Android emulator -> Laravel host
//   timeout: 12000,
// });

const API = axios.create({
  baseURL: 'http://192.168.1.19:8000/api', // Android emulator -> Laravel host
  timeout: 12000,
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === 401) {
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default API;
