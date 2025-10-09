import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLogout } from '../../auth/hooks/useLogout';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/userApi';
import { useHomeNavigation } from '../../../navigation/useAppNavigation';

export default function Home() {

  const {logout} = useLogout();
  const navigation = useHomeNavigation();
  const [user, setUser] = useState(
    { userName: null,
      coin: 0,
    }
  );

  useEffect(()=>{
    getUserInfo()
    .then(data=>{
      setUser({
        userName: data.userName,
        coin: data.coin,
      });
    })
    
  },[])
  
  const handleShop = async () => {
    navigation.navigate('Shop');
  }

  const handleLogout = async () => {
    await logout();
    Alert.alert('로그아웃 완료');
  }

  return (
    <View>
        <Text>Home</Text>
        <Text>{user.userName}</Text>
        <Text>{user.coin}</Text>
        <TouchableOpacity onPress={handleShop}>
          <Text>상점</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
    </View>
  );
}