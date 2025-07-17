import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  AuthStackParamList, 
  DashBoardStackParamList,
  ListeningStackParamList,
  HomeStackParamList } from './types';

//로그인 화면 네비게이션
export function useAuthNavigation() {
  return useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
}

//대시보드 화면 네비게이션
export function useDashBoardNavigation(){
  return useNavigation<NativeStackNavigationProp<DashBoardStackParamList>>();
}

//듣기 영역 화면 네비게이션
export function useListeningNavigation(){
  return useNavigation<NativeStackNavigationProp<ListeningStackParamList>>();
}

//사용자 집 화면 네비게이션
export function useHomeNavigation(){
  return useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
}