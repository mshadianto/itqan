/**
 * ITQĀN ▸ SumoPod proxy (Cloudflare Worker)
 * --------------------------------------------------------------------------
 * Kenapa perlu: ITQĀN di-host sebagai situs statis (GitHub Pages). Memanggil
 * gateway SumoPod langsung dari browser punya 2 masalah:
 *   1) API key akan terekspos di kode/Network tab (bahaya untuk repo publik).
 *   2) CORS — gateway sering tidak mengizinkan request lintas-origin dari browser.
 * Worker ini menjadi perantara: menyimpan key sebagai SECRET, menambah header
 * CORS, lalu meneruskan request ke SumoPod. Frontend cukup menunjuk ke URL
 * Worker ini dan MENGOSONGKAN field API Key.
 *
 * DEPLOY (pakai Wrangler):
 *   1) npm i -g wrangler  (atau pakai dashboard Cloudflare ▸ Workers)
 *   2) wrangler init itqan-sumopod-proxy   (pilih "Hello World" / modul)
 *   3) Ganti isi src dengan berkas ini.
 *   4) Set secret & var:
 *        wrangler secret put SUMOPOD_API_KEY      # tempel sk-... milikmu
 *        # set base + origin yang diizinkan di wrangler.toml [vars] (lihat bawah)
 *   5) wrangler deploy
 *   6) Di ITQĀN ▸ Set ▸ AI: Base URL = https://itqan-sumopod-proxy.<subdomain>.workers.dev
 *      API Key = (kosongkan). Lalu "Test koneksi".
 *
 * wrangler.toml contoh:
 *   name = "itqan-sumopod-proxy"
 *   main = "src/index.js"
 *   compatibility_date = "2025-01-01"
 *   [vars]
 *   SUMOPOD_BASE = "https://ai.sumopod.com/v1"      # verifikasi URL persis di dashboard SumoPod
 *   ALLOWED_ORIGIN = "https://mshadianto.github.io" # atau "*" saat uji coba
 *
 * Catatan: SUMOPOD_API_KEY HARUS lewat `wrangler secret put`, jangan ditulis di toml.
 */

const DEFAULT_BASE = "https://ai.sumopod.com/v1"; // ganti bila SumoPod memakai host lain

function cors(origin, allowed) {
  const allow = (!allowed || allowed === "*") ? "*" : allowed;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function joinUrl(base, path) {
  const b = (base || DEFAULT_BASE).replace(/\/+$/, "");
  // base sudah termasuk /v1 → buang /v1 ganda dari path bila ada
  if (/\/v1$/.test(b) && path.startsWith("/v1/")) return b + path.slice(3);
  return b + path;
}

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "*";
    const headers = cors(request.headers.get("Origin"), allowed);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // Health check
    const url = new URL(request.url);
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      return new Response(JSON.stringify({ ok: true, service: "itqan-sumopod-proxy" }), {
        status: 200, headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405, headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    if (!env.SUMOPOD_API_KEY) {
      return new Response(JSON.stringify({ error: "SUMOPOD_API_KEY belum di-set sebagai secret di Worker." }), {
        status: 500, headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // Path apa pun dari frontend (mis. /v1/chat/completions atau /chat/completions)
    // dipetakan ke SumoPod base. Default ke /v1/chat/completions bila root.
    let path = url.pathname;
    if (path === "/" || path === "") path = "/v1/chat/completions";
    if (path === "/chat/completions") path = "/v1/chat/completions";

    const target = joinUrl(env.SUMOPOD_BASE, path);

    let body;
    try { body = await request.text(); } catch (e) { body = "{}"; }

    let upstream;
    try {
      upstream = await fetch(target, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.SUMOPOD_API_KEY,
        },
        body,
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Upstream fetch gagal", detail: String(e) }), {
        status: 502, headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // Teruskan respons apa adanya + header CORS (mendukung streaming bila dipakai nanti)
    const respHeaders = new Headers(upstream.headers);
    Object.entries(headers).forEach(([k, v]) => respHeaders.set(k, v));
    respHeaders.delete("content-encoding"); // hindari double-encoding di edge

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: respHeaders,
    });
  },
};
