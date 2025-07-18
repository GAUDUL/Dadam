import { View, Text, TouchableOpacity } from 'react-native';
import { useDashBoardNavigation } from '../../../navigation/useAppNavigation';

export default function FirstScreen() {
  const navigation = useDashBoardNavigation();

  return (
    <View>
        <TouchableOpacity
        onPress={()=>navigation.navigate('ListeningStack')}>
            <Text>듣기 영역</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>navigation.navigate('SpeakingStack')}>
            <Text>말하기 영역</Text>
        </TouchableOpacity>
    </View>
  );
}