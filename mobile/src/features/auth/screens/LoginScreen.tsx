import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleSignupNavigation = () => {
    console.log('회원가입');
    navigation.navigate('Signup');
  };

  useEffect(() => {

  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Login Screen</Text>
          <TouchableOpacity
            onPress={handleSignupNavigation}
            style={{
            width: 100, 
            height: 50, 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            borderColor: 'black',
            borderWidth: 1,
            }}
            >
            <Text>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoginScreen;
