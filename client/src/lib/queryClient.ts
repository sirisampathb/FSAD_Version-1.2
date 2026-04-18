import { QueryClient, QueryFunction } from "@tanstack/react-query";

const apiBase = import.meta.env.VITE_API_URL || "https://fsad-backend-3.onrender.com" ||
  (import.meta.env.PROD ? "" : "http://localhost:8080");
console.log("API Base URL:", apiBase || "(relative - proxied by Vercel)");

export function resolveImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("/assets/")) {
    return `${apiBase}${url}`;
  }
  return url;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    console.error(`[API Error] ${res.status}: ${text}`);
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const token = localStorage.getItem("authToken");
  const headers: Record<string, string> = data
    ? { "Content-Type": "application/json" }
    : {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Ensure absolute URL targeting the working Render backend
  const targetUrl = url.startsWith("http") ? url : `${apiBase}${url.startsWith("/") ? url : `/${url}`}`;
  console.log(`[API Request] ${method} ${targetUrl}`, { hasToken: !!token });

  const res = await fetch(targetUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    console.error(`[API Error] ${method} ${targetUrl}:`, res.status, res.statusText);
  }
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const path = queryKey.join("/");
      const url = `${apiBase}/${path.startsWith("/") ? path.slice(1) : path}`;
      const token = localStorage.getItem("authToken");
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(url, {
        headers,
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        console.warn(`[API] Unauthorized (401) for: ${path}, returning null`);
        return null;
      }

      if (!res.ok) {
        console.error(`[API Query Error] ${url}:`, res.status, res.statusText);
      }
      await throwIfResNotOk(res);
      return await res.json();
    };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Retry on network errors, but not on 4xx errors
        if (error instanceof Error) {
          if (error.message.includes("401") || error.message.includes("403")) {
            return false; // Don't retry auth errors
          }
        }
        return failureCount < 3; // Retry up to 3 times for other errors
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
