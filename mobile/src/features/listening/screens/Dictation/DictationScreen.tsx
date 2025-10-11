import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useListeningNavigation } from '../../../../navigation/useAppNavigation';
import { useDictaionProb } from '../../hooks/useDicationProb';

export default function DictationScreen() {
  const navigation = useListeningNavigation();
  const { dictationStart } = useDictaionProb();

  const handleWord = async () => {
    const problemSetId = await dictationStart('word');
    navigation.navigate('DictationProb', { problemSetId });
  };

  const handleSentence = async () => {
    const problemSetId = await dictationStart('sentence');
    navigation.navigate('DictationProb', { problemSetId });
  };

  return (
    <ImageBackground
      source={require('../../../../assets/listening.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <TouchableOpacity
          style={[styles.card, { borderColor: '#195c32ff' }]} 
          onPress={handleWord}
        >
          <Text style={styles.title}>단어 받아쓰기</Text>
          <Text style={styles.description}>짧은 단어 중심, 듣기와 쓰기 연습에 좋아요.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderColor: '#195c32ff' }]} 
          onPress={handleSentence}
        >
          <Text style={styles.title}>문장 받아쓰기</Text>
          <Text style={styles.description}>실제 문장 받아쓰기, 듣기와 이해 연습에 유용해요.</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 4, 
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
