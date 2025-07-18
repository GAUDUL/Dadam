import { useState } from 'react';
import { signupApi } from '../api/authApi';
import type { SignupRequest } from '../types';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signupApi(data);
      
      return res;
    } catch (e: any) {
      setError(e.response?.data?.message || '회원가입 실패');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}