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
        className={cn(isLoading && "opacity-0", !isLoading && "animate-fadeIn")}
      />
      {isLoading && <LoadingSpinner absolute white />}
    </ModalTemplate>
  );
}

export default PhotobookImageViewModal;
