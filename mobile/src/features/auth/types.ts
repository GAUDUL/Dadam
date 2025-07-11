export interface SignupRequest {
  userId: string;
  password: string;
  username: string;
  email: string;
  nativeLanguage: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}