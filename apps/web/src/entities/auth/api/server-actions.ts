"use server";

import { getQueryClient } from "@/shared/api/react-query";
import { serverApi } from "@/shared/api/server-api";
import type { User } from "../types";
import { USER_QUERY_KEY } from "./keys";

export const prefetchUser = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      try {
        return (await serverApi.get<User>("/api/user")).data;
      } catch (error) {
        return null;
      }
    },
  });
  return queryClient;
};
