"use client";

import GalleryItem from "@/components/GalleryItem";
import { ChangeEvent, useEffect, useState } from "react";
import GalleyUploadButton from "./Upload";

import { GalleryDocsObj, GalleryItemDoc } from "@/types";
import { cn, filterDuple } from "@/utils";
import { MasonryGrid } from "@egjs/react-grid";
import { IconRemove } from "@/components/svg";
import { DebounceEvent } from "@/utils/DebounceEvent";
import useToast from "@/components/toast/useToast";

interface GalleryDocsObjWithCombine extends GalleryDocsObj {
  combine: GalleryItemDoc[];
}

interface GalleryContainerProps {
  galleryDocs: GalleryDocsObjWithCombine;
}

type ImageType = "image" | "gif";

function filterUniqueTags(obj: GalleryItemDoc[]) {
  const allTags = obj.map((doc) => doc.tags);
  const flat = allTags.flat(2);
  const unique = filterDuple(flat);

  return unique;
}

function filterByTag(docList: GalleryItemDoc[], tag: string) {
  return docList.filter((doc) => doc.tags.includes(tag));
}

// 1360 < 8
// 1360 > 6
//
const masonryColumnGap = 5;

function columnCount() {
  if (typeof window === "undefined") return;

  if (window.innerWidth > 1360) {
    return 8;
  } else if (window.innerWidth > 735) {
    return 6;
  } else {
    return 4;
  }
}

export default function GalleryContainer(props: GalleryContainerProps) {
  const { galleryDocs } = props;
  const { images, gif, combine } = galleryDocs;

  //render state
  const [masonryColumn, setMasonryColumn] = useState(0);
  const [renderImageList, setRenderImageList] = useState(combine);
  const [uniqueTags, setUniqueTags] = useState(() => filterUniqueTags(combine));
  const [searchKeyword, setSearchKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState<null | ImageType>(null);

  const masonryItemStyle = {
    width: `calc((100% - ${(masonryColumn - 1) * masonryColumnGap}px)/${masonryColumn})`,
  };

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchKeyword(event.target.value);
  }

  function onClickTag(tag: string) {
    if (tag === searchKeyword) {
      setSearchKeyword("");
    } else {
      setSearchKeyword(tag);
      setRenderImageList(filterByTag(combine, tag));
    }
  }

  function onClickTypeTag(type: ImageType) {
    if (type === typeFilter) {
      setTypeFilter(null);
      setRenderImageList(combine);
      return;
    }

    if (searchKeyword === "") {
      if (type === "image") {
        setTypeFilter("image");
        setRenderImageList(images);
      } else {
        setTypeFilter("gif");
        setRenderImageList(gif);
      }
    } else {
      if (type === "image") {
        setTypeFilter("image");
        setRenderImageList(filterByTag(images, searchKeyword));
      } else {
        setTypeFilter("gif");
        setRenderImageList(gif);
        setRenderImageList(filterByTag(gif, searchKeyword));
      }
    }
  }

  useEffect(() => {
    // 만약 필터 기능이 추가된다면 이부분 필터를 고려해야함

    // revalidate시 렌더링 갱신
    setRenderImageList(combine);
    setUniqueTags(filterUniqueTags(combine));
  }, [galleryDocs]);

  useEffect(() => {
    if (searchKeyword === "") {
      setRenderImageList(combine);
    } else {
      const filterdBySeachKeyword = filterByTag(combine, searchKeyword);
      setRenderImageList(filterdBySeachKeyword);
    }
  }, [searchKeyword]);

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

  useEffect(() => {
    console.log(masonryColumn);
  }, [masonryColumn]);
  return (
    <div className="y-inner flex text-black gap-md min-h-screen px-md mo:flex-col">
      {/* filter section */}
      <div className="basis-[20%] min-w-[300px] max-w-[375px] border py-md mo:w-full mo:max-w-full h-min">
        <div className="flex justify-center">
          <GalleyUploadButton className="text-white rounded-md bg-default-gray-bg py-xs px-sm w-[180px] border" />
        </div>
        <div className="px-md mt-md text-sm">
          <span className="opacity-60">필터</span>
          <div className="flex gap-sm mt-xxs text-sm">
            <button
              className={cn("text-white rounded-md bg-default-gray-bg px-sm flex items-center gap-xxs")}
              onClick={() => onClickTypeTag("image")}
              aria-label="filter image"
            >
              사진 {typeFilter === "image" && <IconRemove />}
            </button>
            <button
              className="text-white rounded-md bg-default-gray-bg px-sm flex items-center gap-xxs"
              onClick={() => onClickTypeTag("gif")}
              aria-label="filter gif"
            >
              움짤{typeFilter === "gif" && <IconRemove />}
            </button>
          </div>
        </div>
        <div className="px-md mt-md text-sm">
          <span className="opacity-60">태그</span>
          <div className="flex gap-sm mt-xxs flex-wrap text-sm mo:max-h-[80px] mo:overflow-y-auto">
            {uniqueTags.map((item, idx) => (
              <button
                key={`tag-${item}`}
                className={cn(
                  "rounded-md  text-[#e4e4e7] border px-xs",
                  item === searchKeyword && "bg-default-gray-bg"
                )}
                onClick={() => onClickTag(item)}
                aria-label={`filter ${item}`}
              >
                #{item}
              </button>
              //   <button
              //     key={`tag-${item}`}
              //     className={cn(
              //       "tag text-xs",
              //       item === searchKeyword && "bg-authentic-brown"
              //     )}
              //   >
              //     #{item}
              //   </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border flex-1 pc:min-h-full pc:h-full tab:h-[1000px] overflow-y-auto p-[5px]">
        {masonryColumn !== 0 && (
          <MasonryGrid
            column={masonryColumn}
            gap={5}
            defaultDirection={"end"}
            align={"justify"}
            useResizeObserver={true}
            observeChildren={true}
          >
            {renderImageList.map((i) => (
              <GalleryItem
                style={masonryItemStyle}
                className={cn("rounded-md mo:max-w-[33%]")}
                //   imageClassName="max-w-[183px] mo:max-w-full"
                key={i.id}
                doc={i}
              />
            ))}
          </MasonryGrid>
        )}
      </div>
    </div>
  );
}
