import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "@/shared/api/api";
import type { GlobalResponse, PaginatedData } from "@/shared/types";
import type { Product } from "../types";

export const getAllProducts = ({
  pageParam,
  limit = 20,
}: {
  pageParam?: number;
  limit?: number;
}) => {
  return fetcher<PaginatedData<Product>>(
    `/api/products?page=${pageParam}&limit=${limit}`,
    { next: { revalidate: 999999 } },
  );
};

const fetchOptions = {
  queryKey: ["products"],
  queryFn: getAllProducts,
  initialPageParam: 1,
  getNextPageParam: (data: GlobalResponse<PaginatedData<Product>>) => {
    if (!data.data) return undefined;
    return data.data.next_page_url ? data.data.current_page + 1 : undefined;
  },
};

export const prefetchInfinityProducts = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({ ...fetchOptions, pages: 1 });
  return queryClient;
};

export const useInfinityProductsQuery = () => {
  return useInfiniteQuery(fetchOptions);
};
