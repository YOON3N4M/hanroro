import Image from "next/image";
import { InputHTMLAttributes } from "react";

import { cn } from "@/utils";
import { IconImage } from "./svg";

interface AttachmentInputProps extends InputHTMLAttributes<HTMLInputElement> {
  attachmentSrc?: string | null;
  absolute?: boolean;
}

function AttachmentInput(props: AttachmentInputProps) {
  const { className, absolute = false, ...attrs } = props;

  const { attachmentSrc } = props;
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center",
        absolute && "absolute"
      )}
    >
      {/* id 값 props로 받아야 할지도, 이 컴포넌트가 한 페이지에 여러개 있다면? */}
      <input className="hidden" id="file-input" type="file" {...attrs} />
      {attachmentSrc ? (
        <Image
          width={1000}
          height={1000}
          src={attachmentSrc}
          alt="그룹 커버 이미지"
          className={cn(
            "size-full rounded-md object-cover mo:max-w-[100vw] max-h-[50vh]",
            absolute && "absolute center"
          )}
        />
      ) : (
        <label
          htmlFor="file-input"
          className={cn(
            className,
            "flex bg-black text-white w-[180px] px-xl py-xs cursor-pointer text-sm items-center justify-center rounded-md bg-base-200",
            absolute && "absolute opacity-0 center hover:opacity-80"
          )}
        >
          이미지 선택
        </label>
      )}
    </div>
  );
}

export default AttachmentInput;
