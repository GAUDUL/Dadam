//네비게이션 타입 설정을 위한 ParamList

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type DashBoardStackParamList = {
  DashBoard: undefined;
  ListeningStack: undefined;
  SpeakingStack: undefined;
  WritingStack: undefined;
  HomeStack: undefined;
}

export type ListeningStackParamList = {
  ListeningHome: undefined;
  ListeningStep1: undefined;
  ListeningStep2: undefined;
  Test: undefined;
}

export type SpeakingStackParamList = {
  SpeakingHome: undefined;
}

export type WritingStackParamList = {
  WritingHome: undefined;
}

export type HomeStackParamList = {
  Home: undefined;
}