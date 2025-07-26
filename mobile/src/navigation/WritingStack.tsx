import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WritingHome from '../features/writing/screens/WritingHome';
const Stack = createNativeStackNavigator();

export default function WritingStack() {
  return (
    <Stack.Navigator initialRouteName="WritingHome">
      <Stack.Screen name="WritingHome" component={WritingHome} />
    </Stack.Navigator>
  );
}