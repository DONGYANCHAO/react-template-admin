import type { UserInfo } from "@/types";

export interface LoginState {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  clearUserInfo: () => void;
}

export interface GlobalState {
  primaryColor: string;
  setColor: (color: string) => void;
}
