import MainContainer from "@/containers/main";

import { GalleryDocsObj } from "@/types";
import { Metadata } from "next";

const defaultData: GalleryDocsObj = {
  images: [],
  gif: [],
};

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 메인",
};

export default async function Home() {
  return <MainContainer galleryDocs={defaultData} />;
}
