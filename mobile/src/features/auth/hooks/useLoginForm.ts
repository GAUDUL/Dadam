import { useState } from 'react';

export function useLoginForm() {
  const [user, setUser] = useState({
    userId: '',
    password: ''
  });

  const handleChange = (name: string, value: string) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (text: string) => {
    const filtered = text.replace(/[^a-zA-Z0-9]/g, '');
    handleChange('userId', filtered);
  };

  return {
    user,
    handleChange,
    handleIdChange,
  };
}