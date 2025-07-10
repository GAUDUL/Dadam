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

function SignupScreen() {
  const navigation = useNavigation();

  useEffect(() => {

  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>SignupScreen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignupScreen;
