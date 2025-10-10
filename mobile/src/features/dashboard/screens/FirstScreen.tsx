import { View, Text, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import { useDashBoardNavigation } from '../../../navigation/useAppNavigation';

const { width, height } = Dimensions.get('window');

export default function FirstScreen() {
  const navigation = useDashBoardNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/dashboard_1.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '5%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ListeningStack')}
      >
        <Image source={require('../../../assets/button/listening_button.png')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: '4%',
          top: '20%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('SpeakingStack')}
      >
        <Image source={require('../../../assets/button/speaking_button.png')} />
      </TouchableOpacity>
    </ImageBackground>
  );
}