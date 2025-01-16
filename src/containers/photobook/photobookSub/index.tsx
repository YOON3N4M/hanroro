"use client";

import { MasonryGrid } from "@egjs/react-grid";
import { PhotobookImageData, Photobook, srcGenerate } from "../_local";
import Image from "next/image";
import useModal from "@/components/Modal/useModal";
import PhotobookImageViewModal from "@/components/Modal/form/PhotobookImageViewModal";

interface PhotobookSubContainerProps {
  photobook?: Photobook;
}

const row = 4;
const gap = 5;

function PhotobookSubContainer(props: PhotobookSubContainerProps) {
  const { photobook } = props;

  const { openSingleModal } = useModal();

  if (!photobook) {
    return (
      <div className="y-inner min-h-screen inner">
        <p>존재 하지 않는 페이지 입니다.</p>
      </div>
    );
  }

  const { title, titleEng, imageList } = photobook;

  const masonryItemStyle = {
    width: `calc((100% - ${(row - 1) * gap}px)/${row})`,
  };

  function handleImageClick(imageData: PhotobookImageData) {
    openSingleModal(<PhotobookImageViewModal imageData={imageData} />);
  }

  return (
    <div className="y-inner min-h-screen inner">
      {/* 일반 그리드 */}
      {/* <div className="grid grid-cols-4 gap-[5px]">
        {imageList.map((image) => (
          <div key={image}>
            <Image
              src={srcGenerate(titleEng, image)}
              alt={title}
              width={1000}
              height={1000}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div> */}
      {/* Masonry */}
      <MasonryGrid
        column={row}
        gap={gap}
        useResizeObserver={true}
        observeChildren={true}
        defaultDirection={"end"}
        align={"justify"}
      >
        {imageList.map((image) => (
          <div
            onClick={() => handleImageClick(image)}
            key={image.src}
            style={masonryItemStyle}
            className="cursor-pointer transition-all group"
          >
            <div className="size-full relative">
              <Image
                src={image.src}
                alt={title}
                width={1000}
                height={1000}
                className="size-full object-cover group-hover:brightness-50 transition-all"
              />
              <div className="x-center y-center absolute opacity-0 group-hover:opacity-100 transition-opacity">
                <span>원본 보기</span>
              </div>
              {/* 출처자 */}
              {image.ref && (
                <div className="absolute p-xs bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm opacity-70">
                    사진 제공 : @{image.ref}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </MasonryGrid>
    </div>
  );
}

export default PhotobookSubContainer;
