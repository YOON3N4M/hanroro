"use client";

import { GalleryItemDoc } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import useModal from "./Modal/useModal";
import ImageViewModal from "./Modal/form/ImageViewModal";

interface GalleryItemProps extends HTMLAttributes<HTMLDivElement> {
  doc: GalleryItemDoc;
  imageClassName?: string;
}

function GalleryItem(props: GalleryItemProps) {
  const { doc, className, imageClassName, style, ...attrs } = props;

  const { openSingleModal } = useModal();

  if (!doc) return;

  function onImageClick(imageDoc: GalleryItemDoc) {
    openSingleModal(<ImageViewModal imageDoc={imageDoc} />);
  }

  return (
    <div
      className={cn(className, "cursor-pointer border animate-fadeIn")}
      onClick={() => onImageClick(doc)}
      style={style}
      {...attrs}
    >
      <Image
        width={500}
        height={500}
        src={doc.url}
        className={cn("object-cover", imageClassName)}
        alt={doc.tags[0] || "한로로 짤"}
      />
    </div>
  );
}

export default GalleryItem;
