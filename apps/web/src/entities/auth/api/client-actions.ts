import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { api } from "@/shared/api/api";
import { getQueryClient } from "@/shared/api/react-query";
import type { GlobalResponse } from "@/shared/types";
import type { User } from "../types";
import type { LoginDto } from "../types/types";
import { USER_QUERY_KEY } from "./keys";

const cookies = new Cookies();

export const authApi = {
  // Client-side hook
  useUser: () => {
    return useQuery({
      queryKey: USER_QUERY_KEY,
      queryFn: async () => {
        return (await api.get<User>("/api/user")).data;
      },
    });
  },

  login: () => {
    return useMutation({
      mutationKey: ["user"],
      mutationFn: async ({ email, password }: LoginDto) => {
        await api.post("/login", { email, password });
      },
      onSuccess: async () => {
        toast.success("Logged in successfully");
        getQueryClient().invalidateQueries({ queryKey: ["user"] });
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
};
