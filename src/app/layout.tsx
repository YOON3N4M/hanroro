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
import ToastPortal from "@/components/toast/ToastPortal";
import SmoothScrolling from "@/components/layout/SmoothScrolling";

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS as string;
const GOOGLE_SEARCH_VERIFICATION = process.env
  .GOOGLE_SEARCH_VERIFICATION as string;

export const metadata: Metadata = {
  title: "한로로 팬사이트",
  description:
    "가수 한로로 님의 팬사이트 입니다. 앨범, 공연/행사 일정 등을 확인하고 사진을 공유 할 수 있습니다.",
  icons: {
    icon: "/favicon.png",
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
  //google search console
  verification: {
    google: GOOGLE_SEARCH_VERIFICATION,
    other: {
      "naver-site-verification": "fdecb3ed7af2113b9668ebf39d0e77bea6d8e4e7",
    },
  },
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const caslon = localFont({
  src: "../../public/fonts/LibreCaslonDisplay-Regular.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-caslon",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body
        className={cn(
          "bg-default-black-bg",
          `${pretendard.variable}`,
          caslon.variable
        )}
      >
        <h1 className="visually-hidden">hanroro | fansite</h1>
        <AuthProvider>
          <Header />
          <main className="min-h-full">{children}</main>
          <Footer />
          <ModalPortal />
          <ToastPortal />
          {API_BASE_URL?.includes("localhost") && <Toolbar />}
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
