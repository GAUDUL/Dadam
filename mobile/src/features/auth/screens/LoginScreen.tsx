import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useAuthNavigation } from '../../../navigation/useAppNavigation';
import { testFetch } from '../../../fetch/testFetch';
import { useLoginForm } from '../hooks/useLoginForm';
import { useLogin } from '../hooks/useLogin';

function LoginScreen() {
  const navigation = useAuthNavigation();
  const [check, setCheck] = useState('실패');
  const { user, handleChange, handleIdChange } = useLoginForm();
  const { login } = useLogin();

  useEffect(() => {
    const fetchData = async () => {
      const res = await testFetch();
      setCheck(res);
    };
    fetchData();
  }, []);

  const handleSignupNavigation = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = async () => {
    try {
      await login(user);
      Alert.alert('로그인 성공');
    } catch (e) {
      Alert.alert('로그인 실패');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/login.png')} // 배경 이미지 경로
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

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignupNavigation} style={styles.button}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#a07279ff',
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


export default LoginScreen;
