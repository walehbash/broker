import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@/contexts/AuthContext";
import BootstrapClient from "@/components/BootstrapClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "OctaTrade - Premium Cryptocurrency Investment Platform",
    template: "%s | OctaTrade"
  },
  description: "Professional cryptocurrency investment platform with advanced trading tools, secure wallet integration, PayPal deposits, and expert 24/7 support. Join 250K+ successful traders worldwide.",
  keywords: [
    "cryptocurrency",
    "investment",
    "trading",
    "bitcoin",
    "ethereum",
    "crypto wallet",
    "PayPal deposits",
    "professional trading",
    "blockchain",
    "digital assets",
    "portfolio management",
    "secure trading",
    "crypto exchange",
    "investment platform"
  ],
  authors: [{ name: "OctaTrade Team" }],
  creator: "OctaTrade",
  publisher: "OctaTrade Financial Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://octatrade.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://octatrade.com",
    title: "OctaTrade - Premium Cryptocurrency Investment Platform",
    description: "Professional cryptocurrency investment platform with advanced trading tools, secure wallet integration, and expert support. Trusted by 250K+ traders worldwide.",
    siteName: "OctaTrade",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OctaTrade - Professional Cryptocurrency Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OctaTrade - Premium Cryptocurrency Investment Platform",
    description: "Professional cryptocurrency investment platform with advanced trading tools and secure wallet integration. Join 250K+ successful traders.",
    images: ["/twitter-image.png"],
    creator: "@OctaTrade",
    site: "@OctaTrade",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "finance",
  classification: "Financial Services",
  referrer: "origin-when-cross-origin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "OctaTrade",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#1e293b",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#1e293b",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="OctaTrade" />
        <meta name="author" content="OctaTrade Team" />
        <meta name="generator" content="Next.js" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Apple Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="OctaTrade" />
        
        {/* Microsoft Meta Tags */}
        <meta name="msapplication-TileColor" content="#1e293b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Theme and PWA */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "OctaTrade",
              "description": "Professional cryptocurrency investment platform with advanced trading tools, secure wallet integration, and expert support.",
              "url": "https://octatrade.com",
              "logo": "https://octatrade.com/logo.png",
              "image": "https://octatrade.com/og-image.png",
              "telephone": "+1-555-123-4567",
              "email": "support@octatrade.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Financial District",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10005",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://twitter.com/OctaTrade",
                "https://linkedin.com/company/octatrade",
                "https://facebook.com/octatrade"
              ],
              "offers": {
                "@type": "Offer",
                "description": "Cryptocurrency investment and trading services",
                "availability": "https://schema.org/InStock"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Worldwide"
              },
              "serviceType": "Cryptocurrency Trading Platform",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "12500",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white h-full`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}