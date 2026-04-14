import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import type { GlobalState } from "./types";

interface GlobalActions {
  setColor: (color: string) => void;
}

type GlobalStore = GlobalState & GlobalActions;

type GlobalPersist = (
  config: StateCreator<GlobalStore>,
  options: PersistOptions<GlobalStore, GlobalState>
) => StateCreator<GlobalStore>;

const useGlobalStore = create<GlobalStore>()(
  (persist as GlobalPersist)(
    (set) => ({
      primaryColor: "#247fff",
      setColor: (color) => set(() => ({ primaryColor: color })),
    }),
    {
      name: "primaryColor",
      partialize: (state: GlobalStore): GlobalState => ({
        primaryColor: state.primaryColor,
      }),
    }
  )
);

export default useGlobalStore;
