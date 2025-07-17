import { View, Text, TouchableOpacity } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';

export default function ListeningStep2() {
    const navigation = useListeningNavigation();
  return (
    <View>
        <Text>듣기 영역 2단계</Text>
    </View>
  );
}