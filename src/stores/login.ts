import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginState } from "./types";
import type { UserInfo } from "@/types";

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info: UserInfo | null) => set(() => ({ userInfo: info })),
      clearUserInfo: () => set(() => ({ userInfo: null })),
    }),
    {
      name: "userInfo",
    }
  )
);

export default useLoginStore;
