import axios from "axios";
import type { GlobalResponse } from "../types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
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
