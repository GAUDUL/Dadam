import api from '../../../shared/api';
import { SignupRequest, LoginRequest } from '../types';

export async function signupApi(data: SignupRequest) {
  const response = await api.post('/auth/sign-up', data);
  return response.data;
}

export async function loginApi(data: LoginRequest){
    const response = await api.post('/auth/sign-in', data);
    return response.data;
}

export async function getUserInfo(){
  const response = await api.get('/auth/user-info');
  return response.data;
}