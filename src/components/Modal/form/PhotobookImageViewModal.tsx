import { PhotobookImageData } from "@/containers/photobook/_local";
import ModalTemplate from "../ModalTemplate";
import { useState } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/utils";

interface PhotobookImageViewModalProps {
  imageData: PhotobookImageData;
}

function PhotobookImageViewModal(props: PhotobookImageViewModalProps) {
  const { imageData } = props;
  const { src, ref } = imageData;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <ModalTemplate bg={false}>
      <Image
        src={src}
        width={9999}
        height={9999}
        quality={100}
        alt={src}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "size-full",
          isLoading && "opacity-0",
          !isLoading && "animate-fadeIn"
        )}
      />
      {isLoading && <LoadingSpinner absolute white />}
      {!isLoading && ref && (
        <div className="text-white absolute bottom-0 right-0 z-[100] p-xl animate-fadeIn">
          <span className="text-xs opacity-70">사진 제공 @{ref}</span>
        </div>
      )}
    </ModalTemplate>
  );
}

export default PhotobookImageViewModal;
