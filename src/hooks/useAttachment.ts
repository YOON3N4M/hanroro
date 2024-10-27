import { ChangeEvent, useState } from "react";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/lib/firebase/firebase";

interface Props {}

export function useAttachment() {
  const [tempAttachment, setTempAttachment] = useState(null);

  function handleChangeAttachment(e: ChangeEvent<HTMLInputElement>) {
    let selectedPicture;
    const reader = new FileReader();

    if (e.target.files !== null) {
      selectedPicture = e.target.files[0];
      reader.readAsDataURL(selectedPicture);
      reader.onloadend = (_e: any) => {
        console.log(_e.currentTarget.result);
        setTempAttachment(_e.currentTarget.result);
      };
    }
  }

  async function generateURL(storageURL: string) {
    if (!tempAttachment) return;
    const attachmentRef = ref(storageService, storageURL);
    const res = await uploadString(attachmentRef, tempAttachment, "data_url");
    const attachmentURL = await getDownloadURL(res.ref);
    console.log("업로드 URL", attachmentURL);

    return attachmentURL as string;
  }

  return {
    handleChangeAttachment,
    tempAttachment,
    generateURL,
    setTempAttachment,
  };
}
