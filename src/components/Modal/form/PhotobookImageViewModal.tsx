import { PhotobookImageData, srcGenerate } from "@/containers/photobook/_local";
import ModalTemplate from "../ModalTemplate";
import { useState } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/utils";

interface PhotobookImageViewModalProps {
  imageData: PhotobookImageData;
  titleEng: string;
}

function PhotobookImageViewModal(props: PhotobookImageViewModalProps) {
  const { imageData, titleEng } = props;
  const { imageFileName, ref } = imageData;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <ModalTemplate bg={false}>
      <Image
        src={srcGenerate(titleEng, imageFileName)}
        width={9999}
        height={9999}
        quality={100}
        alt={imageFileName}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "size-auto max-h-[80vh] object-cover mx-auto",
          isLoading && "opacity-0",
          !isLoading && "animate-fadeIn"
        )}
      />
      {isLoading && <LoadingSpinner container absolute white />}
      {!isLoading && ref && (
        <div className="text-white absolute bottom-0 x-center z-[100] animate-fadeIn">
          <span className="text-xs opacity-70">사진 제공 @{ref}</span>
        </div>
      )}
    </ModalTemplate>
  );
}

export default PhotobookImageViewModal;
