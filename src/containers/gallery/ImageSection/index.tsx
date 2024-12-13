import GalleryItem from "@/components/GalleryItem";
import { BasicCarousel } from "@/components/carousel";
import { usePrevNextButtons } from "@/components/carousel/usePrevNextButton";
import { IconRightLeft, IconRightRight } from "@/components/svg";
import { GalleryItemDoc } from "@/types";
import { cn } from "@/utils";
import { DebounceEvent } from "@/utils/DebounceEvent";
import { MasonryGrid } from "@egjs/react-grid";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useGalleryViewType, useSelectedTagList } from "../state";
interface ImageSectionProps {
  imageList: GalleryItemDoc[];
}

function ImageSection(props: ImageSectionProps) {
  const { imageList } = props;

  const seletedTagList = useSelectedTagList();
  const galleryViewType = useGalleryViewType();

  const filteredImageList = imageList.filter((imageDoc) => {
    if (seletedTagList.length < 1) {
      return true;
    } else {
      return seletedTagList.every((item) => imageDoc.tags.includes(item));
    }
  });

  return (
    <>
      {galleryViewType === "gallery" && (
        <GalleryView imageList={filteredImageList} />
      )}
      {galleryViewType === "carousel" && (
        <GridView imageList={filteredImageList} />
      )}
    </>
  );
}

export default ImageSection;

function GalleryView({ imageList }: { imageList: GalleryItemDoc[] }) {
  const [masonryColumn, setMasonryColumn] = useState(0);
  const masonryColumnGap = 5;

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
        {imageList.map((i, idx) => (
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

function GridView({ imageList }: { imageList: GalleryItemDoc[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      // dragFree: true,
      skipSnaps: true,
    },
    [ClassNames({ snapped: "active-slide" })]
  );
  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);
  const { onNextButtonClick, onPrevButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="relative flex-1 flex flex-col items-center mo:!pt-0 justify-center gap-md mo:justify-start w-full overflow-hidden p-xl mo:p-md">
      <div className="flex items-center gap-sm text-sm">
        <div>
          <button
            onClick={onPrevButtonClick}
            className="flex bg-white p-xs rounded-full text-black brightness-50 hover:brightness-100"
          >
            <IconRightLeft fill="black" />
          </button>
        </div>
        <div className="min-w-[70px] flex justify-center">
          <span>{activeIndex + 1}</span>
          <span>/{imageList.length}</span>
        </div>
        <div>
          <button
            onClick={onNextButtonClick}
            className="flex bg-white p-xs rounded-full text-black brightness-50 hover:brightness-100"
          >
            <IconRightRight fill="black" />
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden ">
        <BasicCarousel emblaRef={emblaRef}>
          {imageList.map((imageDoc, idx) => (
            <div
              key={imageDoc.id}
              className="w-[50%] mo:h-min max-h-[800px] mo:w-full shrink-0 flex justify-center items-center ml-md opacity-60 transition-opacity"
            >
              <div className="w-full">
                <GalleryItem className="!border-none" doc={imageDoc} />
              </div>
            </div>
          ))}
        </BasicCarousel>
      </div>
    </div>
  );
}
