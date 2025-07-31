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
  CardSelect: undefined;
  Dictation: undefined;
  CardSelectProb: { problemSetId: string };
  DictationProb: undefined;
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