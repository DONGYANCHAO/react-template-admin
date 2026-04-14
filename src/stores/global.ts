import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GlobalState } from "./types";

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      primaryColor: "#247fff",
      setColor: (color: string) => set(() => ({ primaryColor: color })),
    }),
    {
      name: "primaryColor",
      partialize: (state: GlobalState): Pick<GlobalState, "primaryColor"> => ({
        primaryColor: state.primaryColor,
      }),
    }
  )
);

export default useGlobalStore;
