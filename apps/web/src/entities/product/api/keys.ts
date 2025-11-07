import type { FetchProps } from "./types";

const KEY = "products";

export const productKeys = {
  list: (filters: FetchProps) => [KEY, filters] as const,
};
