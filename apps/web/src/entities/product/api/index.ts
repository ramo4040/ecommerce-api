import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "@/shared/api/api";
import type { GlobalResponse, PaginatedData } from "@/shared/types";
import type { Product } from "../types";

type FetchProps = { categoryId?: number };

export const getAllProducts = ({
  pageParam,
  categoryId,
  limit = 20,
}: {
  pageParam: number;
  categoryId?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  params.append("limit", limit.toString());
  if (categoryId) params.append("category_id", categoryId.toString());

  const url = `/api/products?${params.toString()}`;

  return fetcher<PaginatedData<Product>>(url, {
    next: { revalidate: 99999999 },
  });
};

const fetchOptions = ({ categoryId }: FetchProps) => ({
  queryKey: ["products", categoryId],
  queryFn: ({ pageParam = 1 }) => getAllProducts({ pageParam, categoryId }),
  initialPageParam: 1,
  getNextPageParam: (data: GlobalResponse<PaginatedData<Product>>) => {
    if (!data.data) return undefined;
    return data.data.next_page_url ? data.data.current_page + 1 : undefined;
  },
});

export const prefetchInfinityProducts = async ({ categoryId }: FetchProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    ...fetchOptions({ categoryId }),
    pages: 1,
  });
  return queryClient;
};

export const useInfinityProductsQuery = ({ categoryId }: FetchProps) => {
  return useInfiniteQuery(fetchOptions({ categoryId }));
};
