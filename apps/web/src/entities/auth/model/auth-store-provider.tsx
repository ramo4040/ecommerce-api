"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import type { User } from "../types";
import { type AuthStore, createAuthStore } from "./auth-store";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);

export interface AuthStoreProviderProps {
  children: ReactNode;
  user?: User | null;
}

export const AuthStoreProvider = ({
  children,
  user,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore(user || null);
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used within AuthStoreProvider");
  }

  return useStore(authStoreContext, selector);
};
