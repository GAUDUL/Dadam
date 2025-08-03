import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLogout } from '../../auth/hooks/useLogout';

export default function Home() {
  const {logout} = useLogout();
  
  const handleLogout = async () => {
    await logout();
    Alert.alert('로그아웃 완료');
  }

  return (
    <View>
        <Text>Home</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
    </View>
  );
}