import MainContainer from "@/containers/main";
import { getGallery } from "@/services/_server";

import { GalleryDocsObj } from "@/types";
import { sortByNumber } from "@/utils";
import { Metadata } from "next";

const defaultData: GalleryDocsObj = {
  images: [],
  gif: [],
};

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 메인",
};

export default async function Home() {
  const res = await getGallery();
  const data = res ? ((await res?.json()).data as GalleryDocsObj) : defaultData;
  const sorted = {
    images: sortByNumber(data.images, "uploadAt", true),
    gif: sortByNumber(data.gif, "uploadAt", true),
  };
  return <MainContainer galleryDocs={sorted} />;
}
