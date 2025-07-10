import { useState } from 'react';
import { loginApi } from '../api/authApi';
import type { LoginRequest } from '../types';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(data);
      return res;
    } catch (e: any) {
      setError(e.response?.data?.message || '로그인 실패');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}