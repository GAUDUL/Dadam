import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthStack from './AuthStack';
import DashBoardStack from './DashBoardStack';
import SplashScreen from '../shared/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../shared/store';
import { loginSuccess, logoutSuccess } from '../shared/store/authSlice';

const AppNavigator = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [loading, setLoding] =useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if(token){
        dispatch(loginSuccess(token));
      } else {
        dispatch(logoutSuccess());
      }
      setLoding(false);
    };
    checkToken();
  }, [dispatch]);

  if (loading) return <SplashScreen />;

  return isLoggedIn ? <DashBoardStack /> : <AuthStack />;
};

export default AppNavigator