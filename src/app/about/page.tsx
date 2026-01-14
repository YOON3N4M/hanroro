import AboutContainer from "@/containers/about";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한로로 팬사이트 | About",
  description: "한로로 팬사이트에 대한 정보입니다.",
  openGraph: {
    title: "한로로 팬사이트 | About",
    description: "한로로 팬사이트에 대한 정보입니다.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContainer />;
}
