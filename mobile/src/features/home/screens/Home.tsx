import { View, Text, TouchableOpacity, Alert, ImageBackground, Image, Modal, StyleSheet } from 'react-native';
import { useLogout } from '../../auth/hooks/useLogout';
import { useCallback, useEffect, useState } from 'react';
import { getUserInfo } from '../api/userApi';
import { useHomeNavigation } from '../../../navigation/useAppNavigation';
import CoinBadge from '../components/CoinBadge';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTS } from '../items';

const LANG_MAP: { [key: string]: string } = {
  vi: '베트남어',
  zh: '중국어',
  en: '영어',
};


export default function Home() {
  const { logout } = useLogout();
  const navigation = useHomeNavigation();
  const [user, setUser] = useState({
    userName: null,
    nativeLang: null,
  });
  const [coin, setCoin] = useState<number>(0);
  const [equippedId, setEquippedId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserInfo().then(data => {
      setUser({
        userName: data.userName,
        nativeLang: data.nativeLanguage ?? null,
      });
        setCoin(data.coin);
      });

      AsyncStorage.getItem('@equippedId').then(id => {
        setEquippedId(id ? Number(id) : null);
      });
    }, [])
  );

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
        <View style={{
          position: 'absolute',
          top: 20,
          left: 16,
          width: 250,
          padding: 20,
          backgroundColor: '#fffae4ff',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}>
      <Text style={{ fontSize: 25, fontWeight: '600', color: '#6b5e33ff', marginBottom: 4 }}>
        {user.userName ?? '-'} 어린이
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '500', color: '#6b5e33ff' }}>
        모국어 |   {LANG_MAP[user.nativeLang ?? ''] ?? user.nativeLang ?? '-'}
      </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: -60 }}>
        <View style={{ width: 300, height: 300, position: 'relative' }}>
          <Image
            source={require('../../../assets/character.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
          {(() => {
            if (!equippedId) return null;
            const item = PRODUCTS.find(p => p.id === equippedId);
            if (!item) return null;

            return (
              <Image
                source={item.image}
                style={{
                  position: 'absolute',
                  top: item.top ?? 0,
                  left: item.left ?? 0,
                  width: item.width ?? 100,
                  height: item.height ?? 100,
                }}
                resizeMode="contain"
              />
            );
          })()}
        </View>
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
