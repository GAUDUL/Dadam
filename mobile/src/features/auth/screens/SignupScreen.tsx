import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useAuthNavigation } from '../../../navigation/useAppNavigation';
import { useSignupForm } from '../hooks/useSignupForm';
import { useSignup } from '../hooks/useSignup';
import RNPickerSelect from 'react-native-picker-select';

function SignupScreen() {
  const navigation = useAuthNavigation();

  const languageOptions = [
    { label: '베트남어', value: 'vi' },
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/signup.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <TextInput
              placeholder="아이디"
              placeholderTextColor="#888"
              value={user.userId}
              onChangeText={handleIdChange}
              maxLength={16}
              keyboardType="default"
              style={styles.input}
            />

            <TextInput
              placeholder="비밀번호"
              placeholderTextColor="#888"
              value={user.password}
              secureTextEntry
              onChangeText={(text) => handleChange('password', text)}
              maxLength={20}
              style={styles.input}
            />

            <TextInput
              placeholder="이름"
              placeholderTextColor="#888"
              value={user.username}
              onChangeText={(text) => handleChange('username', text)}
              keyboardType="default"
              style={styles.input}
            />

            <TextInput
              placeholder="이메일"
              placeholderTextColor="#888"
              value={user.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="default"
              style={styles.input}
            />

            <RNPickerSelect
              placeholder={{ label: '모국어를 선택하세요', value: null }}
              onValueChange={(value) => handleChange('nativeLanguage', value)}
              value={user.nativeLanguage}
              items={languageOptions}
              style={{
                inputIOS: { ...styles.input, marginBottom: 25 },
                inputAndroid: { ...styles.input, marginBottom: 25 },
                placeholder: { color: '#888' },
              }}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              style={[styles.button, loading && { opacity: 0.5 }]}
            >
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 60,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#aa8086ff',
    borderRadius: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '70%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10,
    backgroundColor: '#4b3a34ff',
    shadowColor: '#ffb6c7ff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignupScreen;
