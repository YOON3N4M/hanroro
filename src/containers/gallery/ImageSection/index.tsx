import { MasonryGrid } from "@egjs/react-grid";
import { useGalleryViewType, useImageType, useSelectedTagList } from "../state";
import { useEffect, useState } from "react";
import GalleryItem from "@/components/GalleryItem";
import { DebounceEvent } from "@/utils/DebounceEvent";
import { cn } from "@/utils";
import { GalleryItemDoc } from "@/types";

interface ImageSectionProps {
  imageList: GalleryItemDoc[];
}

function ImageSection(props: ImageSectionProps) {
  const { imageList } = props;

  const galleryViewType = useGalleryViewType();

  return (
    <>
      {galleryViewType === "gallery" ? (
        <GalleryView imageList={imageList} />
      ) : (
        <></>
      )}
    </>
  );
}

export default ImageSection;

function GalleryView({ imageList }: { imageList: GalleryItemDoc[] }) {
  const [masonryColumn, setMasonryColumn] = useState(0);
  const masonryColumnGap = 5;

  const seletedTagList = useSelectedTagList();

  const filteredImageList = imageList.filter((imageDoc) => {
    if (seletedTagList.length < 1) {
      return true;
    } else {
      return seletedTagList.every((item) => imageDoc.tags.includes(item));
    }
  });

  function columnCount() {
    if (typeof window === "undefined") return;

    if (window.innerWidth > 1360) {
      return 4;
    } else if (window.innerWidth > 735) {
      return 3;
    } else {
      return 3;
    }
  }

  const masonryItemStyle = {
    width: `calc((100% - ${
      (masonryColumn - 1) * masonryColumnGap
    }px)/${masonryColumn})`,
  };

  useEffect(() => {
    const handleMasonryColumn = () => {
      const newColumnCount = columnCount();
      if (newColumnCount === undefined) return;
      setMasonryColumn(newColumnCount);
    };
    handleMasonryColumn();
    const ResizeDebounced = new DebounceEvent("resize", handleMasonryColumn);
    return () => {
      ResizeDebounced.removeEventListeners();
    };
  }, []);

  return (
    <div className="border flex-1 pc:min-h-screen pc:h-full tab:h-[1000px] overflow-y-auto p-[5px]">
      <MasonryGrid
        column={masonryColumn}
        gap={5}
        defaultDirection={"end"}
        align={"justify"}
        useResizeObserver={true}
        observeChildren={true}
      >
        {/* renderImageList */}
        {filteredImageList.map((i, idx) => (
          <GalleryItem
            style={masonryItemStyle}
            className={cn("rounded-md mo:max-w-[33%]")}
            //   imageClassName="max-w-[183px] mo:max-w-full"
            key={idx}
            doc={i}
          />
        ))}
      </MasonryGrid>
    </div>
  );
}
