import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../features/home/screens/MainPage';


const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen name="MainPage" component={MainPage} />
    </Stack.Navigator>
  );
}