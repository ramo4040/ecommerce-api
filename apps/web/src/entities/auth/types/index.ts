export enum AuthTab {
  Index = "index",
  LoginWithEmail = "login-with-email",
  Login = "login",
  Register = "register",
  ForgotPassword = "forgot-password",
}

export interface User {
  id: string;
  email: string;
  name: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}
