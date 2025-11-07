import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Product } from "../types";

type State = {
  items: {
    item: Product;
    qty: number;
  }[];
  isOpen: boolean;
  totalPrice: () => number;
};

type Actions = {
  addItem: (item: Product, qty: number) => void;
  removeItem: (itemId: number) => void;
  incDec: (itemId: number, qty: number) => void;
  toggleCart: () => void;
};

export const useShoppingCartStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,
      totalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          return total + item.item.price * item.qty;
        }, 0);
      },
      toggleCart: () =>
        set((state: State) => {
          state.isOpen = !state.isOpen;
        }),
      addItem: (item, qty) =>
        set((state: State) => {
          const existingItem = state.items.find((i) => i.item.id === item.id);
          if (existingItem) {
            existingItem.qty += qty;
            return;
          }

          state.items.push({ item, qty });
        }),
      removeItem: (itemId) => {
        set((state: State) => {
          state.items = state.items.filter((i) => i.item.id !== itemId);
        });
      },
      incDec: (itemId, qty) => {
        set((state: State) => {
          const item = state.items.find((i) => i.item.id === itemId);
          if (item) {
            item.qty += qty;
          }
        });
      },
    })),
    {
      name: "shopping-cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        console.log("hydration starts");

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    },
  ),
);
