import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../features/home/screens/Home';
import Shop from '../features/home/screens/Shop';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Shop" component={Shop}/>
    </Stack.Navigator>
  );
}