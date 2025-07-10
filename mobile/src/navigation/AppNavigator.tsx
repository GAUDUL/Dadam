import React from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const isLoggedIn = false;

const AppNavigator = () => {
  return isLoggedIn ? <MainStack /> : <AuthStack />;
};

export default AppNavigator