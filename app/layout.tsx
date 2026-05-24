import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { AppToasts } from "@/components/AppToasts";
import { DesktopCritters } from "@/components/DesktopCritters";
import { ConsoleEasterEgg } from "@/components/ConsoleEasterEgg";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

/** Resolves absolute URLs for metadata. Without this, `metadataBase` defaults to production and favicons break on localhost. */
function getMetadataBase(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[];

  for (const raw of candidates) {
    const trimmed = raw.replace(/\/$/, "");
    try {
      return new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    } catch {
      /* try next */
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  title: "Manikandan M — MAXIM_OS Portfolio",
  description:
    "Pre-final year CSE student holding Development and Cybersecurity together. Full-Stack & Mobile Developer · Application Security Analyst · CTF Player.",
  keywords: [
    "portfolio",
    "developer",
    "cybersecurity",
    "full stack",
    "mobile development",
    "ctf",
    "appsec",
    "manikandan",
    "max-mani",
  ],
  metadataBase: getMetadataBase(),
  alternates: { canonical: "/" },
  /** Favicon from pixel profile at `/images/anime-bot.png`; `.ico` via `npm run favicon`. */
  icons: {
    icon: [
      { url: "/images/anime-bot.png", type: "image/png", sizes: "32x32" },
      { url: "/images/anime-bot.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [{ url: "/images/anime-bot.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050a05",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pressStart2P.variable} suppressHydrationWarning>
      <body className={pressStart2P.className} suppressHydrationWarning>
        {/*
          If you're reading the source, hello.
          fly_01 and fly_02 are not bugs.
          Well. They are bugs. But intentional ones.
          FLAG{s0urc3_c0d3_r34d3rs_g3t_r3sp3ct}
        */}
        {children}
        <ConsoleEasterEgg />
        <DesktopCritters />
        <AppToasts />
      </body>
    </html>
  );
}
