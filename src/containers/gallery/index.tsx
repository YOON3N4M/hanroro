"use client";

import { useEffect } from "react";

import { GalleryDocsObj, GalleryItemDoc } from "@/types";
import { filterDuple } from "@/utils";
import FilterSection from "./FilterSection";
import ImageSection from "./ImageSection";
import { useGalleryActions, useImageType } from "./state";

interface GalleryDocsObjWithCombine extends GalleryDocsObj {
  combine: GalleryItemDoc[];
}

interface GalleryContainerProps {
  galleryDocs: GalleryDocsObjWithCombine;
}

function filterUniqueTags(obj: GalleryItemDoc[]) {
  const allTags = obj.map((doc) => doc.tags);
  const flat = allTags.flat(2);
  const unique = filterDuple(flat);

  return unique;
}

export default function GalleryContainer(props: GalleryContainerProps) {
  const { galleryDocs } = props;
  const { images, gif, combine } = galleryDocs;

  const imageType = useImageType();

  const imageList = () => {
    if (!imageType) return combine;
    if (imageType === "image") {
      return images;
    } else {
      return gif;
    }
  };

  const { setUniqueTagList } = useGalleryActions();

  useEffect(() => {
    setUniqueTagList(filterUniqueTags(combine));
  }, [galleryDocs]);

  return (
    <div className="y-inner flex text-black gap-md min-h-screen px-md mo:flex-col">
      <h2 className="visually-hidden">갤러리</h2>
      <FilterSection />
      <ImageSection imageList={imageList()} />
    </div>
  );
}
