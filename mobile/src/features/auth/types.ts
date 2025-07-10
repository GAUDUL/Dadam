export interface SignupRequest {
  id: string;
  password: string;
  userName: string;
  userEmail: string;
  nativeLanguage: string;
}

export interface LoginRequest {
  id: string;
  password: string;
}