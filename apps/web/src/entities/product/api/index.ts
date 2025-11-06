import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { cache } from "react";
import { fetcher } from "@/shared/api/api";
import type { GlobalResponse, PaginatedData } from "@/shared/types";
import type { Product } from "../types";

type FetchProps = Partial<{
  page: number;
  category_id: number;
  is_featured: number;
  limit: number;
}>;

export const getAllProducts = ({ limit = 10, ...rest }: FetchProps) => {
  const queryParams = Object.entries({ limit, ...rest })
    .filter(([_, v]) => v !== undefined)
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value.toString();
      return acc;
    }, {});

  const params = new URLSearchParams(queryParams);

  const url = `/api/products?${params.toString()}`;

  return fetcher<PaginatedData<Product>>(url, {
    next: { revalidate: false },
  });
};

export const indexProducts = cache(() => {
  return fetcher<Product[]>("/api/products", { next: { revalidate: false } });
});

const fetchOptions = ({ category_id }: FetchProps) => ({
  queryKey: ["products", category_id],
  queryFn: ({ pageParam = 1 }) =>
    getAllProducts({ page: pageParam, category_id }),
  initialPageParam: 1,
  getNextPageParam: (data: GlobalResponse<PaginatedData<Product>>) => {
    if (!data.data) return undefined;
    return data.data.next_page_url ? data.data.current_page + 1 : undefined;
  },
});

export const prefetchInfinityProducts = async ({ category_id }: FetchProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    ...fetchOptions({ category_id }),
    pages: 1,
  });
  return queryClient;
};

export const useInfinityProductsQuery = ({ category_id }: FetchProps) => {
  return useInfiniteQuery(fetchOptions({ category_id }));
};

export const getProductBySlug = (slug: string) => {
  return fetcher<Product>(`/api/products/slug/${slug}`, {
    next: { revalidate: false },
  });
};
