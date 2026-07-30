import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import MotionProvider from "@/components/ui/MotionProvider";
import { SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "Duc Ngo",
    "Ngo Huynh Duc",
    "Front-End Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Ho Chi Minh City",
    "Portfolio",
  ],
  authors: [{ name: SITE.shortName, url: SITE.url }],
  creator: SITE.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Matches app/globals.css light/dark --background so mobile browser chrome
// (address bar) follows the active theme instead of staying default black.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background text-foreground flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <MotionProvider>
            {/* First tab stop: lets keyboard users jump the header's eight
                controls. Off-screen until focused, then pinned over the bar. */}
            <a
              href="#main"
              className="fixed top-3 left-3 z-60 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
            >
              Skip to content
            </a>
            <Navbar />
            {children}
            <BackToTop />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
