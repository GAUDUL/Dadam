import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListeningHome from '../features/listening/screens/ListeningHome';
import CardSelectScreen from '../features/listening/screens/CardSelectScreen';
import DictationScreen from '../features/listening/screens/DictationScreen';
import CardSelectProbScreen from '../features/listening/screens/CardSelectProbScreen';

const Stack = createNativeStackNavigator();

export default function ListeningStack() {
  return (
    <Stack.Navigator initialRouteName="ListeningHome">
      <Stack.Screen name="ListeningHome" component={ListeningHome} />
      <Stack.Screen name="CardSelect" component={CardSelectScreen}/>
      <Stack.Screen name="Dictation" component={DictationScreen}/>
      <Stack.Screen name="CardSelectProb" component={CardSelectProbScreen}/>
    </Stack.Navigator>
  );
}