import { View, Text, TouchableOpacity } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../auth/api/authApi';

export default function ListeningHome() {
    const navigation = useListeningNavigation();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
      getUserInfo()
      .then(data=>setIsAdmin(data.role==='ROLE_ADMIN'))
      .catch(console.error);
    },[]);

  return (
    <View>
        <Text>듣기 영역</Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate('ListeningStep1')}>
            <Text>1단계</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>navigation.navigate('ListeningStep2')}>
            <Text>2단계</Text>
        </TouchableOpacity>
        {isAdmin &&(
          <TouchableOpacity onPress={()=>navigation.navigate('Test')}>
            <Text>Test</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}