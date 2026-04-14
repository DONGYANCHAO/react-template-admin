import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  role: "admin" | "user";
}

export interface LoginState {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  clearUserInfo: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set(() => ({ userInfo: info })),
      clearUserInfo: () => set(() => ({ userInfo: null })),
    }),
    {
      name: "userInfo",
    }
  )
);

export const selectUserInfo = (state: LoginState) => state.userInfo;
export const selectSetUserInfo = (state: LoginState) => state.setUserInfo;
export const selectClearUserInfo = (state: LoginState) => state.clearUserInfo;

export default useLoginStore;
