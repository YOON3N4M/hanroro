"use client";

import { GalleryItemDoc } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import useModal from "./modal/useModal";
import ImageViewModal from "./modal/form/ImageViewModal";

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
      className={cn(
        className,
        "cursor-pointer border transition-all bg-black animate-fadeIn"
      )}
      onClick={() => onImageClick(doc)}
      style={style}
      {...attrs}
    >
      <Image
        width={1000}
        height={1000}
        src={doc.url}
        className={cn("object-cover opacity-0", imageClassName)}
        alt={doc.tags[0] || "한로로 짤"}
      />
    </div>
  );
}

export default GalleryItem;
