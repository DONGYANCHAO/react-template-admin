import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface GlobalState {
  primaryColor: string;
  setColor: (color: string) => void;
}

type GlobalPersist = PersistOptions<GlobalState>;

const partialize: GlobalPersist["partialize"] = (state) =>
  Object.fromEntries(
    Object.entries(state).filter(([key]) => ["primaryColor"].includes(key))
  ) as Partial<GlobalState>;

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      primaryColor: "#247fff",
      setColor: (color) => set(() => ({ primaryColor: color })),
    }),
    {
      name: "primaryColor",
      partialize,
    }
  )
);

export const selectPrimaryColor = (state: GlobalState) => state.primaryColor;
export const selectSetColor = (state: GlobalState) => state.setColor;

export default useGlobalStore;
