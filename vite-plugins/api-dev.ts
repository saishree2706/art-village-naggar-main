import type { Plugin, ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import { existsSync, readdirSync, statSync } from "fs";
import path from "path";

interface ResolvedRoute {
  filePath: string;
  params: Record<string, string>;
}

const HANDLER_EXTS = [".ts", ".js", ".mjs"];

function resolveStatic(apiDir: string, segments: string[]): ResolvedRoute | null {
  const base = path.join(apiDir, ...segments);
  for (const ext of HANDLER_EXTS) {
    if (existsSync(base + ext)) return { filePath: base + ext, params: {} };
  }
  // index.ts inside a folder
  if (existsSync(base) && statSync(base).isDirectory()) {
    for (const ext of HANDLER_EXTS) {
      const indexPath = path.join(base, "index" + ext);
      if (existsSync(indexPath)) return { filePath: indexPath, params: {} };
    }
  }
  return null;
}

function resolveDynamic(apiDir: string, segments: string[]): ResolvedRoute | null {
  if (segments.length === 0) return null;
  const parentDir = path.join(apiDir, ...segments.slice(0, -1));
  if (!existsSync(parentDir) || !statSync(parentDir).isDirectory()) return null;
  const dynFile = readdirSync(parentDir).find((f) =>
    HANDLER_EXTS.some((ext) => new RegExp(`^\\[(.+?)\\]\\${ext}$`).test(f))
  );
  if (!dynFile) return null;
  const paramName = dynFile.replace(/^\[(.+?)\]\..*$/, "$1");
  return {
    filePath: path.join(parentDir, dynFile),
    params: { [paramName]: decodeURIComponent(segments[segments.length - 1]) },
  };
}

function findApiRoute(apiDir: string, pathname: string): ResolvedRoute | null {
  const trimmed = pathname.replace(/^\/api\/?/, "").replace(/\/$/, "");
  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  return resolveStatic(apiDir, segments) ?? resolveDynamic(apiDir, segments);
}

function adaptRequest(req: IncomingMessage, params: Record<string, string>) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const query: Record<string, string | string[]> = { ...params };
  url.searchParams.forEach((value, key) => {
    const existing = query[key];
    if (existing === undefined) {
      query[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      query[key] = [existing, value];
    }
  });

  const cookies: Record<string, string> = {};
  const cookieHeader = req.headers.cookie || "";
  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rest] = part.trim().split("=");
    if (rawName) cookies[rawName] = decodeURIComponent(rest.join("="));
  }

  const adapted = req as IncomingMessage & {
    query: Record<string, string | string[]>;
    cookies: Record<string, string>;
  };
  adapted.query = query;
  adapted.cookies = cookies;
  return adapted;
}

interface AdaptedResponse extends ServerResponse {
  status(code: number): AdaptedResponse;
  json(data: unknown): AdaptedResponse;
  send(data: unknown): AdaptedResponse;
  redirect(statusOrUrl: number | string, maybeUrl?: string): AdaptedResponse;
}

function adaptResponse(res: ServerResponse): AdaptedResponse {
  const adapted = res as AdaptedResponse;
  adapted.status = function (code: number) {
    res.statusCode = code;
    return adapted;
  };
  adapted.json = function (data: unknown) {
    if (!res.getHeader("Content-Type")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(data));
    return adapted;
  };
  adapted.send = function (data: unknown) {
    if (typeof data === "string") {
      if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(data);
    } else if (Buffer.isBuffer(data)) {
      res.end(data);
    } else {
      adapted.json(data);
    }
    return adapted;
  };
  adapted.redirect = function (statusOrUrl: number | string, maybeUrl?: string) {
    let status: number;
    let target: string;
    if (typeof statusOrUrl === "number") {
      status = statusOrUrl;
      target = maybeUrl ?? "/";
    } else {
      status = 307;
      target = statusOrUrl;
    }
    res.statusCode = status;
    res.setHeader("Location", target);
    res.end();
    return adapted;
  };
  return adapted;
}

export function vercelApiDev(): Plugin {
  const apiDir = path.resolve(process.cwd(), "api");

  return {
    name: "vercel-api-dev",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      // Disable browser caching of API responses in dev to avoid stale 304s
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || "";
        if (!rawUrl.startsWith("/api/") && rawUrl !== "/api") return next();

        const pathname = new URL(rawUrl, "http://x").pathname;
        const route = findApiRoute(apiDir, pathname);
        if (!route) return next();

        // Aggressive no-cache so the dev browser doesn't keep serving stale 304s.
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        try {
          const mod = await server.ssrLoadModule(route.filePath);
          const handler = (mod as { default?: unknown }).default;
          if (typeof handler !== "function") {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: `Handler missing default export at ${route.filePath}` }));
            return;
          }

          const adaptedReq = adaptRequest(req, route.params);
          const adaptedRes = adaptResponse(res);

          await (handler as (req: unknown, res: unknown) => Promise<void> | void)(adaptedReq, adaptedRes);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(`[vercel-api-dev] error handling ${pathname}:`, err);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(
              JSON.stringify({
                error: "Dev API error",
                details: err instanceof Error ? err.message : String(err),
              })
            );
          }
        }
      });
    },
  };
}
