"use client";

import React, { useEffect, useState } from "react";
import ModalTemplate from "../ModalTemplate";
import { GalleryItemDoc, UserDoc } from "@/types";
import Image from "next/image";
import { cn } from "@/utils";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getUserDocument } from "@/services/firebase";
import { useUserDoc } from "@/store/auth";
import { IconKebabMenu } from "@/components/svg";

interface ImageViewModalProps {
  imageDoc: GalleryItemDoc;
}

export default function ImageViewModal(props: ImageViewModalProps) {
  const { imageDoc } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [uploaderDoc, setUploaderDoc] = useState<UserDoc | null>(null);

  const userDoc = useUserDoc();

  useEffect(() => {
    async function getUser() {
      const userDoc = (await getUserDocument(
        imageDoc.uploaderId
      )) as UserDoc | null;
      if (!userDoc) return;
      setUploaderDoc(userDoc);
    }
    getUser();
  }, []);
  return (
    <ModalTemplate bg={false}>
      <div className="flex relative">
        {!isLoading && (
          <div className="absolute top-0 w-full z-10 p-md">
            <div className="flex justify-end">
              <button className="text-white">
                <IconKebabMenu className="size-[24px] opacity-80" />
              </button>
            </div>
          </div>
        )}
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
        {/* text panel */}
        {!isLoading && (
          <div className="absolute w-full h-[100px] bottom-0 bg-black opacity-50 flex flex-col text-white p-md">
            <div className="flex gap-xs">
              {imageDoc.tags.map((tag, idx) => (
                <span key={`${imageDoc.id}-${idx}`} className="text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex justify-end text-xs">
              {uploaderDoc && <span>업로드 : {uploaderDoc.displayName}</span>}
            </div>
          </div>
        )}
      </div>
      {isLoading && <LoadingSpinner />}
    </ModalTemplate>
  );
}
