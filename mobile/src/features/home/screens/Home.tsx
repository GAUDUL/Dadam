import { View, Text, TouchableOpacity, Alert, ImageBackground, Image, Modal, StyleSheet } from 'react-native';
import { useLogout } from '../../auth/hooks/useLogout';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/userApi';
import { useHomeNavigation } from '../../../navigation/useAppNavigation';
import CoinBadge from '../components/CoinBadge';

export default function Home() {
  const { logout } = useLogout();
  const navigation = useHomeNavigation();
  const [user, setUser] = useState<string>();
  const [coin, setCoint] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUserInfo().then(data => {
      setUser(data.userName);
      setCoint(data.coin);
    });
  }, []);

  const handleShop = async () => {
    navigation.navigate('Shop');
  };

  const handleLogout = async () => {
    await logout();
    setModalVisible(false);
    Alert.alert('로그아웃 완료');
  };

  return (
    <ImageBackground
      source={require('../../../assets/home.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ position: 'absolute', top: 20, right: 20, alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>⚙️</Text>
        </TouchableOpacity>
        <CoinBadge coin={coin} absolute={false} />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 200 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>사용자: {user}</Text>
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 80,
          right: 40,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleShop}
      >
        <Image
          source={require('../../../assets/button/shop_button.png')}
          style={{ width: 180, height: 180, resizeMode: 'contain' }}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.modalText}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalText, { marginTop: 12 }]}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: 200,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
