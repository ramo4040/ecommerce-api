import { create } from "zustand";
import { AuthTab } from "../types";

type State = {
  tab: Partial<AuthTab>[];
};

type Actions = {
  pushTab: (tab: AuthTab) => void;
  popTab: () => void;
};

export const useAuthModalStore = create<State & Actions>((set, get) => ({
  tab: [AuthTab.Index],
  pushTab: (tab) => set({ tab: [...get().tab, tab] }),
  popTab: () => set({ tab: get().tab.slice(0, -1) }),
}));
