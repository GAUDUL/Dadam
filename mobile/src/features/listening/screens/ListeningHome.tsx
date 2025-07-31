import { View, Text, TouchableOpacity } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';

export default function ListeningHome() {
    const navigation = useListeningNavigation();
  return (
    <View>
        <Text>듣기 영역</Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate('CardSelect')}>
            <Text>카드 고르기</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Dictation')}>
            <Text>받아쓰기</Text>
        </TouchableOpacity>
    </View>
  );
}