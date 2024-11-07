"use client";

import GalleryItem from "@/components/GalleryItem";
import { ChangeEvent, useEffect, useState } from "react";
import GalleyUploadButton from "./Upload";

import { GalleryDocsObj, GalleryItemDoc } from "@/types";
import { cn, filterDuple } from "@/utils";
import { MasonryGrid } from "@egjs/react-grid";

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

export default function GalleryContainer(props: GalleryContainerProps) {
  const { galleryDocs } = props;
  const { images, gif, combine } = galleryDocs;

  //render state
  const [renderImageList, setRenderImageList] = useState(combine);
  const [uniqueTags, setUniqueTags] = useState(() => filterUniqueTags(combine));
  const [searchKeyword, setSearchKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState<null | ImageType>(null);

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

  return (
    <div className="mt-md">
      <div className="flex flex-col">
        <div className="flex gap-xs">
          <input
            className="bg-white border text-sm px-xs border-authentic-light max-w-[168px]"
            placeholder="tag..."
            onChange={onChange}
            value={searchKeyword}
          />
        </div>
        <div className="flex mt-sm gap-sm">
          <button
            className={cn("button text-xs", typeFilter === "image" && "bg-authentic-brown")}
            onClick={() => onClickTypeTag("image")}
            aria-label="filter image"
          >
            image
          </button>
          <button
            className={cn("button text-xs", typeFilter === "gif" && "bg-authentic-brown")}
            onClick={() => onClickTypeTag("gif")}
            aria-label="filter gif"
          >
            gif
          </button>
          <GalleyUploadButton className="ml-auto" />
        </div>
      </div>
      <div className="flex gap-xs mt-sm text-sm flex-wrap max-h-[80px] overflow-hidden">
        {/* <button className="tag">image</button>
				<button className="tag">gif</button> */}
        {uniqueTags.map((item, idx) => (
          <button
            key={`tag-${item}`}
            className={cn("tag text-xs", item === searchKeyword && "bg-authentic-brown")}
            onClick={() => onClickTag(item)}
            aria-label={`filter ${item}`}
          >
            #{item}
          </button>
        ))}
      </div>
      <div className="mt-sm w-full">
        {/* 갤러리 영역 */}
        {/* <MasonryGrid
					column={3}
					gap={5}
					defaultDirection={'end'}
					align={'justify'}
					useResizeObserver={true}
					observeChildren={true}
				>
					{renderImageList.map((i) => (
						<GalleryItem
							className="rounded-md mo:max-w-[33%]"
							imageClassName="max-w-[183px] mo:max-w-full"
							key={i.id}
							doc={i}
						/>
					))}
				</MasonryGrid> */}
      </div>
    </div>
  );
}
