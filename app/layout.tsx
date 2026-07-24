// app/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

export const metadata: Metadata = {
  title: "Belleza India | Depilación Con Hilo",
  description: "El único salón de Madrid especializado en depilación con hilo tradicional, henna y rituales de belleza ayurvédicos.",
  icons: {
    icon: '/logo2.ico',
    apple: '/logo2.ico',
  },
  openGraph: {
    title: "Belleza India | Depilación Con Hilo",
    description: "El único salón de Madrid especializado en depilación con hilo tradicional, henna y rituales de belleza ayurvédicos.",
    url: "https://bellezaindia.com",
    siteName: "Belleza India",
    images: [
      {
        url: "/logo2.ico",
        width: 500,
        height: 500,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belleza India | Depilación Con Hilo",
    description: "El único salón de Madrid especializado en depilación con hilo tradicional, henna y rituales de belleza ayurvédicos.",
    images: ["/logo2.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}