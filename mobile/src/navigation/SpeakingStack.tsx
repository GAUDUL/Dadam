import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpeakingHome from '../features/speaking/screens/SpeakingHome';
const Stack = createNativeStackNavigator();

export default function SpeakingStack() {
  return (
    <Stack.Navigator initialRouteName="SpeakingHome">
      <Stack.Screen name="SpeakingHome" component={SpeakingHome} />
    </Stack.Navigator>
  );
}