"use client";

import React from "react";
import ModalTemplate from "../ModalTemplate";
import { GalleryItemDoc } from "@/types";
import Image from "next/image";

interface ImageViewModalProps {
  imageDoc: GalleryItemDoc;
}

export default function ImageViewModal(props: ImageViewModalProps) {
  const { imageDoc } = props;

  console.log(imageDoc);
  return (
    <ModalTemplate>
      <Image
        width={3000}
        height={3000}
        src={imageDoc.url}
        alt={imageDoc.title}
        className="pc:max-h-[80vh] object-cover pc:w-auto mo:max-w-[80vw]"
      />
      <div className="absolute top-full mt-md flex gap-sm text-sm">
        {imageDoc.tags.map((tag, idx) => (
          <span key={`${imageDoc.id}-${idx}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </ModalTemplate>
  );
}
