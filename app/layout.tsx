import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Share_Tech_Mono, VT323, Inter, Orbitron } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
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
  title: "Manikandan M — Cyber + Code Portfolio",
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
  /** Primary tab icon: `/favicon.ico` for Google; Apple touch uses PNG. */
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/images/anime-bot-favicon.png?v=4", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} ${shareTechMono.variable} ${vt323.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
