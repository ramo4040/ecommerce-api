import axios from "axios";
import { Cookies } from "react-cookie";
import { getCsrfToken } from "@/entities/auth";
import type { GlobalResponse } from "../types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const cookies = new Cookies();
  const csrfToken = cookies.get("XSRF-TOKEN");

  if (!csrfToken) {
    await getCsrfToken();
  }

  return config;
});

// this for native nextjs server side fetch and revalidate usage
export const fetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<GlobalResponse<T>> => {
  try {
    const fullUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

    const response = await fetch(fullUrl, {
      ...options,
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: `Failed to fetch data: ${error}` };
  }
};
