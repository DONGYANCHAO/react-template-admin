import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "./types";

interface LoginState {
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

export default useLoginStore;
