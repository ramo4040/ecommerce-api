import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Product } from "../types";

type State = {
  items: {
    item: Product;
    qty: number;
  }[];
  totalPrice: () => number;
};

type Actions = {
  addItem: (item: Product, qty: number) => void;
  removeItem: (itemId: number) => void;
  incDec: (itemId: number, qty: number) => void;
};

export const useShoppingCartStore = create<State & Actions>()(
  immer((set, get) => ({
    items: [],
    totalPrice: () => {
      const items = get().items;
      return items.reduce((total, item) => {
        return total + item.item.price * item.qty;
      }, 0);
    },
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
);
