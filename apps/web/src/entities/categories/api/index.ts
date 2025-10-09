import { cache } from "react";
import { fetcher } from "@/shared/api/api";
import type { Category } from "../types";

export const useCategories = cache(async () => {
	return await fetcher<Category[]>("/api/categories");
});
