import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const h = req.headers;
  const cf = h.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const nf = h.get("x-nf-client-connection-ip");
  if (nf) return nf.trim();
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  const fwd = h.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return "Unknown";
}

function headerGeo(req: NextRequest): { city: string; region: string; country: string } {
  const h = req.headers;
  const city = h.get("x-vercel-ip-city")?.trim() ?? "";
  const country = h.get("x-vercel-ip-country")?.trim() ?? "";
  const region = h.get("x-vercel-ip-country-region")?.trim() ?? "";
  return { city, region, country };
}

function buildLocation(parts: { city: string; region: string; country: string }): string {
  const city = parts.city.trim();
  const region = parts.region.trim();
  const country = parts.country.trim();
  if (city && country) {
    if (region && region !== city && !city.includes(region)) {
      return `${city}, ${region}, ${country}`;
    }
    return `${city}, ${country}`;
  }
  if (city) return city;
  if (region && country) return `${region}, ${country}`;
  return country;
}

/** Server-side geo for IP when CDN headers are empty (no browser CORS). */
async function lookupGeoByIp(ip: string): Promise<string> {
  if (!ip || ip === "Unknown" || ip === "127.0.0.1" || ip === "::1") return "";
  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return "";
    const d = (await res.json()) as Record<string, unknown>;
    if (d.error) return "";
    const city = String(d.city ?? "");
    const region = String(d.region ?? d.region_code ?? "");
    const country = String(d.country_name ?? d.country_code ?? "");
    return buildLocation({ city, region, country });
  } catch {
    return "";
  }
}

export async function GET(req: NextRequest) {
  const ip = clientIp(req);

  if (ip === "127.0.0.1" || ip === "::1" || ip === "Unknown") {
    return NextResponse.json({
      ip: ip === "Unknown" ? "Unknown" : ip,
      location: "Local development",
    });
  }

  const hg = headerGeo(req);
  let location = buildLocation(hg);

  if (!location) {
    location = await lookupGeoByIp(ip);
  }

  if (!location) {
    try {
      const res = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const d = (await res.json()) as Record<string, unknown>;
        const city = String(d.city ?? "");
        const region = String(d.region ?? "");
        const country = String(d.country ?? "");
        location = buildLocation({ city, region, country });
      }
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json({
    ip,
    location: location || "Unknown",
  });
}
