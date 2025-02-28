"use client";

import NeedLoginModal from "@/components/Modal/form/NeedLoginModal";
import UploadModal from "@/components/Modal/form/UploadModal";
import useModal from "@/components/Modal/useModal";
import { useUser } from "@/store/auth";
import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";

interface GalleyUploadButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GalleyUploadButton(props: GalleyUploadButtonProps) {
  const { className } = props;
  const { openSingleModal } = useModal();

  const user = useUser();
  function onClickUpload() {
    if (user) {
      openSingleModal(<UploadModal />);
    } else {
      openSingleModal(<NeedLoginModal />);
    }
  }

  return (
    <button
      onClick={onClickUpload}
      className={cn("text-xs", className)}
      aria-label="upload image"
    >
      이미지 업로드
    </button>
  );
}
