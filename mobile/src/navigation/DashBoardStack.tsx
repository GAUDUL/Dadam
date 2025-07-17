import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../features/dashboard/screens/DashBoard';
import ListeningStack from './ListeningStack';
import SpeakingStack from './SpeakingStack';
import WritingStack from './WritingStack';
import HomeStack from './HomeStack';

const Stack = createNativeStackNavigator();

export default function DashBoardStack() {
  return (
    <Stack.Navigator initialRouteName="DashBoard">
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="ListeningStack" component={ListeningStack}  options={{ headerShown: false }} />
      <Stack.Screen name="SpeakingStack" component={SpeakingStack}  options={{ headerShown: false }} />
      <Stack.Screen name="WritingStack" component={WritingStack}  options={{ headerShown: false }} />
      <Stack.Screen name="HomeStack" component={HomeStack}  options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}