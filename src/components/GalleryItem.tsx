"use client";

import { GalleryItemDoc } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import useModal from "./modal/useModal";
import ImageViewModal from "./modal/form/ImageViewModal";

interface GalleryItemProps extends HTMLAttributes<HTMLDivElement> {
  doc: GalleryItemDoc;
}

function GalleryItem(props: GalleryItemProps) {
  const { doc, className, ...attrs } = props;

  const { openSingleModal } = useModal();

  if (!doc) return;

  function onImageClick(imageDoc: GalleryItemDoc) {
    openSingleModal(<ImageViewModal imageDoc={imageDoc} />);
  }

  return (
    <div
      className={cn(className, "cursor-pointer transition-all mo:max-w-[33%]")}
      onClick={() => onImageClick(doc)}
      {...attrs}
    >
      <Image
        width={1000}
        height={1000}
        src={doc.url}
        className="max-w-[183px] mo:max-w-full"
        alt={doc.tags[0]}
      />
    </div>
  );
}

export default GalleryItem;
