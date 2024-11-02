"use client";

import React, { useEffect, useState } from "react";
import ModalTemplate from "../ModalTemplate";
import { GalleryItemDoc } from "@/types";
import Image from "next/image";
import { cn } from "@/utils";

interface ImageViewModalProps {
  imageDoc: GalleryItemDoc;
}

export default function ImageViewModal(props: ImageViewModalProps) {
  const { imageDoc } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <ModalTemplate bg={false}>
      <Image
        width={3000}
        height={3000}
        src={imageDoc.url}
        alt={"이미지"}
        className={cn(
          "pc:max-h-[80vh] object-cover pc:w-auto mo:max-w-[80vw]",
          isLoading && "opacity-0"
        )}
        onLoad={() => setIsLoading(false)}
      />
      {!isLoading && (
        <div className="absolute top-full text-sm text-white">
          <div className="flex gap-xs">
            {imageDoc.tags.map((tag, idx) => (
              <span key={`${imageDoc.id}-${idx}`} className="text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </ModalTemplate>
  );
}
