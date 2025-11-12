import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = xsrfToken;
  }

  // forward all cookies
  const allCookies = cookieStore
    .getAll()
    .filter((c) => ["XSRF-TOKEN", "laravel-session"].includes(c.name))
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (allCookies) {
    config.headers.Cookie = allCookies;
  }

  return config;
});
