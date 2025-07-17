import { View, Text, TouchableOpacity } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';

export default function ListeningStep1() {
    const navigation = useListeningNavigation();
  return (
    <View>
        <Text>듣기 영역 1단계</Text>
    </View>
  );
}