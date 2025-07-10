import { useState } from 'react';

export function useLoginForm() {
  const [user, setUser] = useState({
    id: '',
    password: ''
  });

  const handleChange = (name: string, value: string) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (text: string) => {
    const filtered = text.replace(/[^a-zA-Z0-9]/g, '');
    handleChange('id', filtered);
  };

  return {
    user,
    handleChange,
    handleIdChange,
  };
}