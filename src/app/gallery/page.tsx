import GalleryContainer from "@/containers/gallery";
import { fetchGallery } from "@/services/_server";
import { GalleryDocsObj } from "@/types";
import { sortByNumber } from "@/utils";
import { Metadata } from "next";
import React from "react";

const defaultData = {
  images: [],
  gif: [],
  combine: [],
};

export const metadata: Metadata = {
  title: "한로로 팬사이트 | 갤러리",
  description: "한로로 님의 짤을 공유할 수 있습니다.",
  openGraph: {
    title: "한로로 팬사이트 | 갤러리",
    description: "한로로 님의 짤을 공유할 수 있습니다.",
    type: "website",
  },
};

export default async function GalleryPage() {
  const res = await fetchGallery();
  const data = res ? ((await res?.json()).data as GalleryDocsObj) : defaultData;
  const sorted = {
    images: sortByNumber(data.images, "uploadAt", true),
    gif: sortByNumber(data.gif, "uploadAt", true),
  };
  const combine = combineImageGif(data);
  const galleryDocs = { ...sorted, combine };
  return <GalleryContainer galleryDocs={galleryDocs} />;
}

function combineImageGif(obj: GalleryDocsObj) {
  if (!obj.images) return [];
  if (!obj.gif) return [];

  const { gif, images } = obj;

  const beforeSort = [...images, ...gif];
  const afterSort = beforeSort.sort((a, b) => b.uploadAt - a.uploadAt);

  return afterSort;
}
