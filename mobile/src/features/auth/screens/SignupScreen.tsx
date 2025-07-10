import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAppNavigation } from '../../../navigation/useAppNavigation';
import { useSignupForm } from '../hooks/useSignupForm';
import { useSignup } from '../hooks/useSignup';
import RNPickerSelect from 'react-native-picker-select';

function SignupScreen() {
  const navigation = useAppNavigation();

  const languageOptions = [
  { label: '베트남어', value: 'ja' },
  { label: '영어', value: 'en' },
  { label: '중국어', value: 'zh' },
  ];

  const { user, handleChange, handleIdChange } = useSignupForm();
  const { signup, loading } = useSignup();

  const handleSubmit = async () => {
    try {
      await signup(user);
      Alert.alert('회원가입 성공');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('회원가입 실패');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Signup Screen</Text>
          
          <TextInput
                placeholder="아이디"
                placeholderTextColor="#888"
                value={user.id}
                onChangeText={handleIdChange}
                maxLength={16}
                keyboardType="default"
          />

          <TextInput
                placeholder="비밀번호"
                placeholderTextColor="#888"
                value={user.password}
                secureTextEntry
                onChangeText={text => handleChange('password', text)}
                 maxLength={20}
          />

          <TextInput
                placeholder="이름"
                placeholderTextColor="#888"
                value={user.id}
                onChangeText={text=> handleChange('userName', text)}
                keyboardType="default"
          />

          <TextInput
                placeholder="이메일"
                placeholderTextColor="#888"
                value={user.id}
                onChangeText={text=> handleChange('userEmail', text)}
                keyboardType="default"
          />

          <RNPickerSelect
                placeholder={{ label: '모국어를 선택하세요', value: null }}
                onValueChange={(value) => handleChange('nativeLanguage', value)}
                value={user.nativeLanguage}
                items={languageOptions}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={[styles.button, loading && { opacity: 0.5 }]}
            >
            <Text>회원가입</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default SignupScreen;
