import React, { KeyboardEvent, useRef, useState } from "react";
import ModalTemplate from "../ModalTemplate";
import AttachmentInput from "@/components/AttachmentInput";
import { useAttachment } from "@/hooks/useAttachment";
import { GalleryItemDoc } from "@/types";
import { uploadImage } from "@/services/firebase";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "@/components/LoadingSpinner";
import useModal from "../useModal";
import { revalidateApi } from "@/services/_server";

export default function UploadModal() {
  const { handleChangeAttachment, tempAttachment, generateURL, isGifType } =
    useAttachment();
  const { closeAllModal } = useModal();

  //const [title, setTitle] = useState('')
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  // function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
  // 	setTitle(event.target.value)
  // }

  function onTagChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTag(event.target.value);
  }

  function onTagSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTags([...tags, tag]);
    setTag("");
  }

  function onTagBtnClick(idx: number) {
    const filtered = tags.filter((item, index) => index !== idx);
    setTags(filtered);
  }

  function handleSpaceBar(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === " ") {
      event.preventDefault();
      setTags([...tags, tag]);
      setTag("");
    }
  }

  function forceSubmitRevalidateForm() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  async function onUpload() {
    // if (title === '') {
    // 	console.log('none title')
    // 	return
    // }
    setIsLoading(true);

    const storageFileName = uuidv4();

    const attachmentUrl = await generateURL(
      `gallery/${isGifType ? "gif" : "images"}/${storageFileName}`
    );
    if (!attachmentUrl) return;

    // docs 생성
    const newImageDoc: GalleryItemDoc = {
      //title,
      tags,
      url: attachmentUrl,
      isGif: isGifType,
      uploaderId: "test",
      storageFileName: storageFileName,
      uploadAt: new Date().getTime(),
    };

    await uploadImage(newImageDoc);
    forceSubmitRevalidateForm();

    setIsLoading(false);
    closeAllModal();
  }

  return (
    <ModalTemplate>
      <div className="relative pc:min-w-[500px] mo:min-w-[80vw] min-h-[50vh] max-w-[500px] mo:max-w-[300px] text-sm flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="flex w-full cursor-pointer items-center justify-center rounded-md bg-base-300">
            <AttachmentInput
              onChange={handleChangeAttachment}
              attachmentSrc={tempAttachment}
            />
          </div>
        </div>
        <form ref={formRef} action={revalidateApi}></form>
        {tempAttachment && (
          <div className="flex flex-col mt-md">
            {/* <label className="">제목</label>
						<input
							className="border mt-xs"
							onChange={onTitleChange}
							value={title}
						/> */}
            <form onSubmit={onTagSubmit} className="flex flex-col">
              <label className="mt-sm">태그</label>
              <p className="text-xs opacity-80 mt-xxxs">
                태그는 검색시 필터링에 사용됩니다.
              </p>
              <p className="text-xs opacity-80 mt-xxxs">
                단어 입력후 엔터를 입력하면 태그가 만들어집니다.
              </p>
              <input
                className="border mt-xs"
                onChange={onTagChange}
                value={tag}
                onKeyDown={handleSpaceBar}
              />
            </form>
            <div className="mt-sm flex gap-xs">
              {tags.map((tagItem, idx) => (
                <button
                  key={idx}
                  className="tag"
                  onClick={() => onTagBtnClick(idx)}
                >
                  <span>#{tagItem}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="py-xxxs px-xs bg-authentic-dark text-white"
                onClick={onUpload}
              >
                <span>upload</span>
              </button>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="absolute center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </ModalTemplate>
  );
}
