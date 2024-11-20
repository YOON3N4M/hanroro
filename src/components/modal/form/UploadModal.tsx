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
import { useUser } from "@/store/auth";
import useToast from "@/components/toast/useToast";
import { TOAST_MESSAGE } from "@/components/toast/message";

export default function UploadModal() {
  const { handleChangeAttachment, tempAttachment, generateURL, isGifType } =
    useAttachment();
  const { closeAllModal } = useModal();
  const { addToast } = useToast();

  const user = useUser();

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
    if (!user) return;
    if (tags.length === 0) return;
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
      uploaderId: user?.uid,
      storageFileName: storageFileName,
      uploadAt: new Date().getTime(),
    };

    await uploadImage(newImageDoc);
    forceSubmitRevalidateForm();

    setIsLoading(false);
    addToast({ message: TOAST_MESSAGE.uploadSucess });
    closeAllModal();
  }

  return (
    <ModalTemplate>
      <div className="relative pc:min-w-[500px] mo:min-w-[80vw] min-h-[30vh] max-w-[500px] mo:max-w-[300px] text-sm flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="flex w-full cursor-pointer items-center justify-center rounded-md bg-base-300">
            <AttachmentInput
              onChange={handleChangeAttachment}
              attachmentSrc={tempAttachment}
            />
          </div>
        </div>
        {!tempAttachment && (
          <div className="text-xs mt-md bg-default-gray-bg p-sm">
            <div>
              <span>업로드 금지 항목</span>
              <ul>
                <li>- 한로로 님과 관련 없는 이미지</li>
                <li>- 타인에게 불쾌감을 줄 수 있는 이미지</li>
                <li>- 선정적, 음란성 이미지</li>
                <li>- 개인의 신상이 노출 될 여지가 있는 이미지</li>
              </ul>
              <p className="mt-xs">
                상기 금지 항목을 위반하고 업로드된 이미지는 관리자가 예고 없이
                삭제 할 수 있으며
                <br className="mo:hidden" /> 부적절한 이미지 업로드로 인해
                발생하는 모든 문제의 책임은 본인에게 있습니다.
              </p>
              <p className="mt-sm">
                그 외 한로로 님과 관련된 이미지들은 자유롭게 업로드 가능합니다!
              </p>
            </div>
          </div>
        )}

        <form ref={formRef} action={revalidateApi}></form>
        {tempAttachment && (
          <div className="flex flex-col mt-md bg-default-gray-bg p-sm">
            {/* <label className="">제목</label>
						<input
							className="border mt-xs"
							onChange={onTitleChange}
							value={title}
						/> */}
            <form onSubmit={onTagSubmit} className="flex flex-col">
              <label className="mt-sm">
                태그 <span className="text-red-500">*</span>
              </label>
              <p className="text-xs opacity-80 mt-xs">
                태그는 검색시 필터링에 사용됩니다.
              </p>
              <p className="text-xs opacity-80 mt-xxxs">
                단어 입력후 엔터를 입력하면 태그가 만들어집니다.
              </p>
              <input
                className="border mt-xs text-default-black-bg"
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
                  aria-label="remove tag"
                >
                  <span>#{tagItem}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="button py-xxs disabled:opacity-50"
                onClick={onUpload}
                aria-label="image upload button"
                disabled={tags.length === 0 ? true : false}
              >
                <span>업로드</span>
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
