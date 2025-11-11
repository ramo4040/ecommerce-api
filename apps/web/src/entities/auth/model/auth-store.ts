import { createStore } from "zustand";
import type { User } from "../types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const createAuthStore = (user: User | null = null) => {
  return createStore<AuthStore>()((set) => ({
    user,
    isAuthenticated: !!user,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }));
};
