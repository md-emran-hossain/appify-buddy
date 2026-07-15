import { type NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  return proxyRequest(request, params);
}

async function proxyRequest(
  request: NextRequest,
  paramsPromise: Promise<{ proxy: string[] }>
) {
  const { proxy } = await paramsPromise;
  const path = proxy.join("/");
  const url = new URL(request.url);
  const backendUrl = `${BACKEND}/api/v1/${path}${url.search}`;

  const headers = new Headers();

  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (
      lower === "host" ||
      lower === "origin" ||
      lower === "referer" ||
      lower === "connection" ||
      lower === "sec-fetch-mode" ||
      lower === "sec-fetch-site" ||
      lower === "sec-fetch-dest"
    ) {
      return;
    }
    headers.set(key, value);
  });

  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
    fetchOptions.body = request.body;
    (fetchOptions as Record<string, unknown>).duplex = "half";
  }

  try {
    const res = await fetch(backendUrl, fetchOptions);

    console.log(`[proxy] ${request.method} ${backendUrl} -> ${res.status}`);
    console.log(`[proxy] cookies forwarded:`, request.headers.get("cookie") ? "yes" : "none");

    const responseHeaders = new Headers();

    res.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower === "transfer-encoding") return;
      if (lower === "set-cookie") return;
      if (lower === "content-encoding") return;
      if (lower === "content-length") return;
      responseHeaders.set(key, value);
    });

    const rawCookies = res.headers.getSetCookie?.() ?? [];
    if (rawCookies.length > 0) {
      const rewritten = rawCookies.map((c) => rewriteCookieForProxy(c, url.origin));
      for (const c of rewritten) {
        responseHeaders.append("set-cookie", c);
      }
    }

    const bodyContent = await res.arrayBuffer();

    return new NextResponse(bodyContent, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error(`[proxy] Error fetching ${backendUrl}:`, err);
    return NextResponse.json(
      { message: "Backend unreachable", error: err instanceof Error ? err.message : "unknown" },
      { status: 502 }
    );
  }
}

function rewriteCookieForProxy(cookie: string, origin: string): string {
  const url = new URL(origin);
  const isSecure = url.protocol === "https:";

  return cookie
    .replace(/;\s*Domain=[^;]*/gi, "")
    .replace(/;\s*Secure/gi, isSecure ? "; Secure" : "")
    .replace(/;\s*SameSite=\w*/gi, isSecure ? "; SameSite=None" : "; SameSite=Lax");
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
