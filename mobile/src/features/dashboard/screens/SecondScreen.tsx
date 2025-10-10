import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useDashBoardNavigation } from '../../../navigation/useAppNavigation';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../home/api/userApi';

export default function SecondScreen() {
  const navigation = useDashBoardNavigation();
  const [userName, setUserName] = useState<string>('');

  useEffect(()=>{
    getUserInfo()
    .then((data)=>{
      setUserName(data.userName);
    })
  })
  return (
    <ImageBackground
        source={require('../../../assets/dashboard_2.png')}
        style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
        resizeMode='cover'
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: '3%',
          top: '37%',
          alignItems: 'center',
        }}
          onPress={()=>navigation.navigate('WritingStack')}>
          <Image source={require('../../../assets/button/writing_button.png')}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: '-1%',
          bottom: '10%',
          alignItems: 'center',
          }}
        onPress={() => navigation.navigate('HomeStack')}
      >
       <Image source={require('../../../assets/button/home_button.png')} />
       <View 
        style={{
          backgroundColor: 'white',
          borderColor:'#f17e7eff',
          borderWidth: 2,
          borderRadius: 8,
          paddingHorizontal: 25,
          paddingVertical: 4,
          marginTop: 4,
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', }}>
            {userName}(이)의 집
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}