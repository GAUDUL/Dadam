import api from '../../../shared/api';
import { SignupRequest, LoginRequest } from '../types';

export async function signupApi(data: SignupRequest) {
  const response = await api.post('/signup', data);
  return response.data;
}

export async function loginApi(data: LoginRequest){
    const response = await api.post('/login', data);
    return response.data;
}