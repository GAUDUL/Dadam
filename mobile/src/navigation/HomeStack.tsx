import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../features/home/screens/Home';
import Shop from '../features/home/screens/Shop';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#473d2eff',
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
          color: '#fcfcfcff',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: '#fcfcfcff',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: '집' }}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{ headerTitle: '상점' }}
      />
    </Stack.Navigator>
  );
}