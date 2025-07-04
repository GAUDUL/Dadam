import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native';
import {testFetch} from "./fetch/testFetch";
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';


function App() {
  const [check, setCheck]=useState('');
  const [data, setData]=useState({word:'',uri:''})

  useEffect(() => {
    const fetchData = async()=>{
      const res=await testFetch();
      setCheck(res);
    }

    fetchData();
  }, []);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.images] });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('사용자가 취소함');
      } else {
        console.error(err);
      }
    }
  };

  const uploadWord = () =>{

  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.sectionTitle}>테스트</Text>
          <Text style={styles.highlight}>서버 연결 {check}</Text>
          <TextInput
            placeholder='단어'
            value={data.word}
            onChangeText={(text)=>setData(prev=>({...prev, word: text}))}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
            width: 100, 
            height: 50, 
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            }}
            >
            <Text style={{ color: 'white', fontSize: 12 }}>이미지 선택</Text>
          </TouchableOpacity>
          <Pressable
            onPress={pickFile}
            style={({ pressed }) => [
            {
              width: 100, 
              height: 50,
              backgroundColor: pressed ? '#005BBB' : 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            },
            ]}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>파일 선택</Text>
          </Pressable>

          <TouchableOpacity
            onPress={uploadWord}
            style={{ 
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            }}
            >
            <Text style={{ color: 'white', fontSize: 12 }}>업로드</Text>
          </TouchableOpacity>

          {data.uri && (
          <Image source={{ uri: data.uri }} style={{ width: 100, height: 100, marginTop: 20 }} />
          )}

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
