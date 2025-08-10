import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../../shared/store/authSlice';

//Logout Test
export function useLogout() {
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    dispatch(logoutSuccess());
  };

  return { logout };
}
