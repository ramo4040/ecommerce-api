"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { api } from "@/shared/api/api";
import type { GlobalResponse } from "@/shared/types";
import type { LoginDto, User } from "../types/types";
import { USER_QUERY_KEY } from "./keys";

const cookies = new Cookies();

export const authApi = {
  useUser: () => {
    return useQuery({
      queryKey: USER_QUERY_KEY,
      queryFn: async () => {
        return (await api.get<User>("/api/user")).data;
      },
      retry: false,
      staleTime: 0,
    });
  },
  login: () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: USER_QUERY_KEY,
      mutationFn: async ({ email, password }: LoginDto) => {
        await api.post("/login", { email, password });
      },
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: USER_QUERY_KEY });
        toast.success("Logged in successfully");
        router.push("/shop");
      },
      onError: (err: AxiosError<GlobalResponse>) => {
        toast.error(
          err.response?.data?.message || "An error occurred during login",
        );
      },
    });
  },

  getCsrfToken: async () => {
    const csrfToken = cookies.get("XSRF-TOKEN");

    if (!csrfToken) {
      await api.get("/sanctum/csrf-cookie");
    }
  },

  logout: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: USER_QUERY_KEY,
      mutationFn: async () => {
        await api.post("/logout");
      },
      onSuccess: async () => {
        toast.success("Logged out successfully");
        queryClient.setQueryData(USER_QUERY_KEY, null);
      },
      onError: (err: AxiosError<GlobalResponse>) => {
        toast.error(
          err.response?.data?.message || "An error occurred during logout",
        );
      },
    });
  },
};
