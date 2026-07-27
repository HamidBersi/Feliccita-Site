import { getDishProxyTarget } from "@/lib/dish-reservation";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const requestUrl = new URL(request.url);
  const targetUrl = getDishProxyTarget(`/${path.join("/")}`, requestUrl.search);

  const headers = new Headers();
  const accept = request.headers.get("accept");
  const contentType = request.headers.get("content-type");

  if (accept) headers.set("Accept", accept);
  if (contentType) headers.set("Content-Type", contentType);
  headers.set("X-Requested-With", "XMLHttpRequest");

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const response = await fetch(targetUrl, init);
  const responseHeaders = new Headers();

  const responseContentType = response.headers.get("content-type");
  if (responseContentType) {
    responseHeaders.set("Content-Type", responseContentType);
  }

  responseHeaders.set("Cache-Control", "no-store");

  // Node.js interdit `new Response(body, { status: 304 })` — renvoyer sans corps.
  if (response.status === 304) {
    return new Response(null, { status: 304, headers: responseHeaders });
  }

  const body = await response.arrayBuffer();

  return new Response(body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function GET(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}
