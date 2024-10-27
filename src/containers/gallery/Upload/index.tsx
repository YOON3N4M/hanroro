"use client";

import UploadModal from "@/components/modal/form/UploadModal";
import useModal from "@/components/modal/useModal";
import React from "react";

export default function GalleyUploadButton() {
  const { openSingleModal } = useModal();

  function onClickUpload() {
    openSingleModal(<UploadModal />);
  }

  return <button onClick={onClickUpload}>upload</button>;
}
