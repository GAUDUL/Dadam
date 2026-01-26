import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../home/api/userApi';
import { useCardProb } from '../hooks/useCardProb';

export default function ListeningHome() {
  const navigation = useListeningNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const {cardSelectStart, loading, error} = useCardProb(); 

  useEffect(() => {
    getUserInfo()
      .then(data => setIsAdmin(data.role === 'ROLE_ADMIN'))
      .catch(console.error);
  }, []);

    const handleCardSelectStart = async () => {
    try {
      const problemSetId = await cardSelectStart();
      navigation.navigate('CardSelectProb', { problemSetId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/listening.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: '5%'
        }}
      >
        <TouchableOpacity
          onPress={handleCardSelectStart}
          style={{
            width: '40%',
            aspectRatio: 0.8,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../assets/button/cardselect_button.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Dictation')}
          style={{
            width: '40%',
            aspectRatio: 0.8,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../assets/button/dictation_button.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      {isAdmin && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Test')}
          style={{ position: 'absolute', bottom: 40, right: 20 }}
        >
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>Test</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}
