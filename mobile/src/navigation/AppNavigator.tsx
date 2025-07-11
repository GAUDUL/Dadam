import {useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashScreen from '../shared/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return <SplashScreen />;
  }

  return isLoggedIn ? <MainStack /> : <AuthStack />;
};

export default AppNavigator