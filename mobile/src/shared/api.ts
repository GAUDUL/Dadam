import axios from 'axios';
import { REACT_APP_SPRING_API } from '@env';

const api = axios.create({
  baseURL: REACT_APP_SPRING_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;