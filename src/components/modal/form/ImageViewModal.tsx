"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { IconKebabMenu } from "@/components/svg";
import { TOAST_MESSAGE } from "@/components/toast/message";
import useToast from "@/components/toast/useToast";
import { API_TAG } from "@/services";
import { fetchUserDisplayName, revalidateApi } from "@/services/_server";
import { deleteGalleryItem } from "@/services/firebase";
import { useUserDoc } from "@/store/auth";
import { GalleryItemDoc } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ModalTemplate from "../ModalTemplate";
import useModal from "../useModal";

interface ImageViewModalProps {
  imageDoc: GalleryItemDoc;
}

export default function ImageViewModal(props: ImageViewModalProps) {
  const { imageDoc } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [uploaderDisplayName, setUploaderDisplayName] = useState<string | null>(
    null
  );
  const [isDropdown, setIsDropdown] = useState(false);

  const { closeAllModal } = useModal();
  const { addToast } = useToast();

  const userDoc = useUserDoc();

  const formRef = useRef<HTMLFormElement | null>(null);

  function handleKebabClick() {
    setIsDropdown((prev) => !prev);
  }

  async function handleDeleteClick() {
    await deleteGalleryItem(imageDoc);
    forceSubmitRevalidateForm();
    addToast({ message: TOAST_MESSAGE.deleteSucess });
    closeAllModal();
  }

  function forceSubmitRevalidateForm() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  useEffect(() => {
    async function getUploaderDisplayName() {
      const res = await fetchUserDisplayName(imageDoc.uploaderId);
      if (!res) return;
      const resJson = await res?.json();
      const name = resJson.data;
      setUploaderDisplayName(name);
    }

    getUploaderDisplayName();
  }, []);
  return (
    <ModalTemplate bg={false}>
      <form
        className="visually-hidden"
        ref={formRef}
        action={() => revalidateApi(API_TAG.gallery)}
      ></form>
      <div className="flex relative">
        {!isLoading && userDoc?.uid === imageDoc.uploaderId && (
          <div className="absolute top-0 w-full z-10 p-md">
            <div className="flex justify-end">
              <div className="relative bg-[#0000003b] size-[30px] flex items-center justify-center rounded-full ">
                <button className="text-white">
                  <IconKebabMenu
                    onClick={handleKebabClick}
                    className="size-[24px] opacity-80"
                  />
                </button>
                {isDropdown && (
                  <div className="absolute right-full bg-white">
                    <button
                      onClick={handleDeleteClick}
                      className="button min-w-[100px] p-xxxs bg-white text-red-400 top-0 hover:bg-gray-100"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
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
            isLoading && "opacity-0",
            !isLoading && "animate-fadeIn"
          )}
          onLoad={() => setIsLoading(false)}
        />
        {/* text panel */}
        {!isLoading && (
          <div className="absolute w-full h-[80px] bottom-0 bg-default-black-bg opacity-50 flex flex-col text-white p-md">
            <div className="flex gap-xs">
              {imageDoc.tags.map((tag, idx) => (
                <span key={`${imageDoc.id}-${idx}`} className="text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex justify-end text-xs">
              {uploaderDisplayName && (
                <span>업로드 : {uploaderDisplayName}</span>
              )}
            </div>
          </div>
        )}
      </div>
      {isLoading && <LoadingSpinner />}
    </ModalTemplate>
  );
}
