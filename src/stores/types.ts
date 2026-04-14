export interface UserInfo {
  username: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  autoLogin?: boolean;
}

export interface AuthLoaderData {
  isAdmin: boolean;
}

export interface GlobalState {
  primaryColor: string;
}
