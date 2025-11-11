import { api } from "@/shared/api/api";
import type { User } from "../types";

export const getUser = async () => {
  return (await api.get<User>("/api/user")).data;
};

export const login = async (email: string, password: string) => {
  return (await api.post("/login", { email, password })).status;
};

export const getCsrfToken = async () => {
  return await api.get("/sanctum/csrf-cookie");
};
