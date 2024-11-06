import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ModalPortal from "@/components/modal/ModalPortal";
import Toolbar from "./Toolbar";
import localFont from "next/font/local";
import { cn } from "@/utils";
import { API_BASE_URL } from "@/services";
import AuthProvider from "@/components/auth/AuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hanroro | fanpage",
  description: "한로로 팬페이지",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL(API_BASE_URL),
  openGraph: {
    images: [
      {
        url: "/images/profile/profile.jpg",
        alt: "한로로",
      },
    ],
  },
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS as string;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className={cn("h-full w-full text-authentic-dark", `${pretendard.variable}`)}>
        <AuthProvider>
          <Header />
          <main className="inner h-full bg-white flex flex-col">
            {children}
            <Footer />
          </main>
          <ModalPortal />
          {API_BASE_URL?.includes("localhost") && <Toolbar />}
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
