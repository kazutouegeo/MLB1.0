import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MLB 1.0 - Baseball Analytics Platform",
    template: "%s | MLB 1.0"
  },
  description: "Advanced baseball analytics and performance tracking platform. Get real-time stats, player insights, and team analytics.",
  keywords: ["baseball", "analytics", "MLB", "sports", "statistics", "performance"],
  authors: [{ name: "MLB 1.0 Team" }],
  creator: "MLB 1.0",
  publisher: "MLB 1.0",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "MLB 1.0 - Baseball Analytics Platform",
    description: "Advanced baseball analytics and performance tracking platform",
    siteName: "MLB 1.0",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLB 1.0 - Baseball Analytics Platform",
    description: "Advanced baseball analytics and performance tracking platform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        <div id="skip-nav" className="sr-only">
          <a 
            href="#main-content" 
            className="absolute left-0 top-0 z-50 -translate-y-full transform bg-blue-600 px-4 py-2 text-white transition-transform focus:translate-y-0"
          >
            Skip to main content
          </a>
        </div>
        {children}
        <div id="portal-root" />
      </body>
    </html>
  );
}
