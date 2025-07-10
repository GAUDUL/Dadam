import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from './types';  // 경로 조정

export type AppNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function useAppNavigation() {
  return useNavigation<AppNavigationProp>();
}