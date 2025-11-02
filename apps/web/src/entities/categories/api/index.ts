import { cache } from "react";
import { fetcher } from "@/shared/api/api";
import type { Category } from "../types";

export const useCategories = cache(() =>
  fetcher<Category[]>("/api/categories", { next: { revalidate: false } }),
);
