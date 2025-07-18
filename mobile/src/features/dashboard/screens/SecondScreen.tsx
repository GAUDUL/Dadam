import { View, Text, TouchableOpacity } from 'react-native';
import { useDashBoardNavigation } from '../../../navigation/useAppNavigation';

export default function SecondScreen() {
  const navigation = useDashBoardNavigation();
  return (
    <View>
        <TouchableOpacity
        onPress={()=>navigation.navigate('WritingStack')}>
            <Text>쓰기 영역</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = {()=>navigation.navigate('HomeStack')}>
            <Text>집</Text>
        </TouchableOpacity>
    </View>
  );
}