"use client";

import UploadModal from "@/components/modal/form/UploadModal";
import useModal from "@/components/modal/useModal";
import { cn } from "@/utils";
import React, { ButtonHTMLAttributes } from "react";

interface GalleyUploadButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GalleyUploadButton(props: GalleyUploadButtonProps) {
  const { className } = props;
  const { openSingleModal } = useModal();

  function onClickUpload() {
    openSingleModal(<UploadModal />);
  }

  return (
    <button onClick={onClickUpload} className={cn("button text-xs", className)}>
      upload
    </button>
  );
}
