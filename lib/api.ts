const API_BASE = "/api/v1";

interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ApiClientError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
  }
}

let onAuthFailure: (() => void) | null = null;
let refreshPromise: Promise<boolean> | null = null;

export function setOnAuthFailure(cb: (() => void) | null) {
  onAuthFailure = cb;
}

async function doRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;

  const headers: Record<string, string> = {};

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (res.status === 401 && path !== "/auth/refresh" && path !== "/auth/login" && path !== "/auth/register") {
    if (!refreshPromise) {
      refreshPromise = doRefresh().finally(() => {
        refreshPromise = null;
      });
    }
    const refreshed = await refreshPromise;

    if (refreshed) {
      const retryRes = await fetch(url, {
        credentials: "include",
        ...options,
        headers: { ...headers, ...options.headers },
      });

      if (!retryRes.ok) {
        let errorBody: ApiError;
        try {
          errorBody = await retryRes.json();
        } catch {
          errorBody = { statusCode: retryRes.status, message: retryRes.statusText };
        }
        const message = Array.isArray(errorBody.message)
          ? errorBody.message.join(", ")
          : errorBody.message;
        throw new ApiClientError(message, errorBody.statusCode);
      }

      if (retryRes.status === 204) {
        return undefined as T;
      }
      return retryRes.json();
    }

    onAuthFailure?.();
    throw new ApiClientError("Session expired", 401);
  }

  if (!res.ok) {
    let errorBody: ApiError;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { statusCode: res.status, message: res.statusText };
    }
    const message = Array.isArray(errorBody.message)
      ? errorBody.message.join(", ")
      : errorBody.message;
    throw new ApiClientError(message, errorBody.statusCode);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}

function post<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });
}

function patch<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: "DELETE" });
}

// Auth
export const authApi = {
  register(data: { firstName: string; lastName: string; email: string; password: string }) {
    return post<{ user: import("../types").AuthUser }>("/auth/register", data);
  },
  login(data: { email: string; password: string }) {
    return post<{ user: import("../types").AuthUser }>("/auth/login", data);
  },
  logout() {
    return post<void>("/auth/logout");
  },
  me() {
    return get<import("../types").AuthUser>("/auth/me");
  },
  refresh() {
    return post<void>("/auth/refresh");
  },
  googleRedirect() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";
    return `${backend}/api/v1/auth/google`;
  },
};

// Posts
export const postsApi = {
  feed(params?: { limit?: number; cursor?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    const qs = searchParams.toString();
    return get<{ items: import("../types").FeedPost[]; nextCursor: string | null }>(
      `/posts/feed${qs ? `?${qs}` : ""}`
    );
  },
  create(formData: FormData) {
    return post<Record<string, unknown>>("/posts", formData);
  },
  getOne(postId: string) {
    return get<{ post: import("../types").FeedPost }>(`/posts/${postId}`);
  },
  update(postId: string, data: { text?: string; visibility?: "PUBLIC" | "PRIVATE" }) {
    return patch<{ post: import("../types").FeedPost }>(`/posts/${postId}`, data);
  },
  remove(postId: string) {
    return del<void>(`/posts/${postId}`);
  },
  like(postId: string) {
    return post<void>(`/posts/${postId}/like`);
  },
  unlike(postId: string) {
    return del<void>(`/posts/${postId}/like`);
  },
  likes(postId: string, params?: { limit?: number; cursor?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    const qs = searchParams.toString();
    return get<{ items: import("../types").User[]; nextCursor: string | null }>(
      `/posts/${postId}/likes${qs ? `?${qs}` : ""}`
    );
  },
};

// Comments
export const commentsApi = {
  list(postId: string, params?: { limit?: number; cursor?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    const qs = searchParams.toString();
    return get<{ items: import("../types").Comment[]; nextCursor: string | null }>(
      `/posts/${postId}/comments${qs ? `?${qs}` : ""}`
    );
  },
  create(postId: string, data: { text: string }) {
    return post<{ comment: import("../types").Comment }>(`/posts/${postId}/comments`, data);
  },
  update(commentId: string, data: { text: string }) {
    return patch<{ comment: import("../types").Comment }>(`/comments/${commentId}`, data);
  },
  remove(commentId: string) {
    return del<void>(`/comments/${commentId}`);
  },
  replies(commentId: string, params?: { limit?: number; cursor?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    const qs = searchParams.toString();
    return get<{ items: import("../types").Comment[]; nextCursor: string | null }>(
      `/comments/${commentId}/replies${qs ? `?${qs}` : ""}`
    );
  },
  createReply(commentId: string, data: { text: string }) {
    return post<{ comment: import("../types").Comment }>(`/comments/${commentId}/replies`, data);
  },
  like(commentId: string) {
    return post<void>(`/comments/${commentId}/like`);
  },
  unlike(commentId: string) {
    return del<void>(`/comments/${commentId}/like`);
  },
  likes(commentId: string, params?: { limit?: number; cursor?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    const qs = searchParams.toString();
    return get<{ items: import("../types").User[]; nextCursor: string | null }>(
      `/comments/${commentId}/likes${qs ? `?${qs}` : ""}`
    );
  },
};
