import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListeningHome from '../features/listening/screens/ListeningHome';
import DictationScreen from '../features/listening/screens/Dictation/DictationScreen';
import CardSelectProbScreen from '../features/listening/screens/CardSelect/CardSelectProbScreen';
import CardSelectScoreScreen from '../features/listening/screens/CardSelect/CardSelectScoreScreen';
import DictationProbScreen from '../features/listening/screens/Dictation/DictationProbScreen';
import DictationScoreScreen from '../features/listening/screens/Dictation/DictationScoreScreen';
import Test from '../features/listening/screens/Test';

const Stack = createNativeStackNavigator();

export default function ListeningStack() {
  return (
    <Stack.Navigator
      initialRouteName="ListeningHome"
      screenOptions={{
        headerStyle: { backgroundColor: '#8dc785ff' },
        headerTintColor: '#000000ff',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ListeningHome"
        component={ListeningHome}
        options={{ headerTitle: '듣기 허수아비의 텃밭' }}
      />
      <Stack.Screen
        name="CardSelectProb"
        component={CardSelectProbScreen}
        options={{ headerTitle: '카드 고르기' }}
      />
      <Stack.Screen
        name="CardSelectScore"
        component={CardSelectScoreScreen}
        options={{ headerTitle: '점수 확인' }}
      />
      <Stack.Screen
        name="Dictation"
        component={DictationScreen}
        options={{ headerTitle: '받아쓰기 유형 선택' }}
      />
      <Stack.Screen
        name="DictationProb"
        component={DictationProbScreen}
        options={{ headerTitle: '받아쓰기' }}
      />
      <Stack.Screen
        name="DictationScore"
        component={DictationScoreScreen}
        options={{ headerTitle: '점수 확인' }}
      />
      <Stack.Screen
        name="Test"
        component={Test}
      />
    </Stack.Navigator>
  );
}