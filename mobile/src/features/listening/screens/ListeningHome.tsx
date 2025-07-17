import { View, Text, TouchableOpacity } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';

export default function ListeningHome() {
    const navigation = useListeningNavigation();
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
    </View>
  );
}