import { useInfiniteQuery } from "@tanstack/react-query";
import { cache } from "react";
import { fetcher } from "@/shared/api/api";
import { getQueryClient } from "@/shared/api/react-query";
import type { GlobalResponse, PaginatedData } from "@/shared/types";
import type { Product } from "../types";
import { productKeys } from "./keys";
import type { FetchProps } from "./types";

export type { FetchProps };
export { productKeys };

export const getAllProducts = ({ limit = 10, ...rest }: FetchProps) => {
  const queryParams = Object.entries({ limit, ...rest })
    .filter(([_, v]) => v !== undefined)
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value.toString();
      return acc;
    }, {});

  const params = new URLSearchParams(queryParams);

  const url = `/api/products?${params.toString()}`;

  return fetcher<PaginatedData<Product>>(url);
};

export const indexProducts = cache(() => {
  return fetcher<Product[]>("/api/products", { next: { revalidate: false } });
});

const createInfiniteProductsQueryOptions = (params: FetchProps) => ({
  queryKey: productKeys.list(params),
  queryFn: ({ pageParam = 1 }) =>
    getAllProducts({ page: pageParam, ...params }),
  initialPageParam: 1,
  getNextPageParam: (data: GlobalResponse<PaginatedData<Product>>) => {
    if (!data.data) return undefined;
    return data.data.next_page_url ? data.data.current_page + 1 : undefined;
  },
});

export const useInfinityProductsQuery = (
  params: FetchProps,
  enabled?: boolean,
) => {
  return useInfiniteQuery({
    ...createInfiniteProductsQueryOptions(params),
    enabled,
  });
};

export const prefetchInfinityProducts = async (params: FetchProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    ...createInfiniteProductsQueryOptions(params),
    pages: 1,
  });
  return queryClient;
};

export const getProductBySlug = (slug: string) => {
  return fetcher<Product>(`/api/products/slug/${slug}`, {
    next: { revalidate: false },
  });
};
