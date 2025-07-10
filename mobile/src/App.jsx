import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {testFetch} from "./fetch/testFetch";


function App() {
  const [check, setCheck]=useState('');

  useEffect(() => {
    const fetchData = async()=>{
      const res=await testFetch();
      setCheck(res);
    }

    fetchData();
  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.sectionTitle}>테스트</Text>
          <Text style={styles.highlight}>서버 연결 {check}</Text>
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

export default App;
