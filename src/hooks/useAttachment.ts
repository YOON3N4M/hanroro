import { ChangeEvent, useState } from "react";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/lib/firebase/firebase";
import { isGif } from "@/utils";

interface Props {}

export function useAttachment() {
  const [tempAttachment, setTempAttachment] = useState(null);
  const [isGifType, setIsGifType] = useState(false);

  function handleChangeAttachment(e: ChangeEvent<HTMLInputElement>) {
    let selectedPicture;
    const reader = new FileReader();

    if (e.target.files !== null) {
      selectedPicture = e.target.files[0];
      setIsGifType(isGif(e.target.files[0].name));
      reader.readAsDataURL(selectedPicture);
      reader.onloadend = (_e: any) => {
        setTempAttachment(_e.currentTarget.result);
      };
    }
  }

  async function generateURL(storageURL: string) {
    if (!tempAttachment) return;
    const attachmentRef = ref(storageService, storageURL);
    const res = await uploadString(attachmentRef, tempAttachment, "data_url");
    const attachmentURL = await getDownloadURL(res.ref);

    return attachmentURL as string;
  }

  return {
    handleChangeAttachment,
    tempAttachment,
    generateURL,
    setTempAttachment,
    isGifType,
  };
}
