import GalleryContainer from "@/containers/gallery";
import { getGallery } from "@/services/firebase";
import { GalleryDocsObj } from "@/types";
import { sortByNumber } from "@/utils";
import React from "react";

const defaultData = {
  images: [],
  gif: [],
  combine: [],
};

export default async function GalleryPage() {
  const res = await getGallery();
  const data = res ? ((await res?.json()).data as GalleryDocsObj) : defaultData;
  const sorted = { images: sortByNumber(data.images, "uploadAt", true), gif: sortByNumber(data.gif, "uploadAt", true) };
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
