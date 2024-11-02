"use client";

import GalleryItem from "@/components/GalleryItem";
import { useEffect, useState } from "react";
import GalleyUploadButton from "./Upload";

import { GalleryDocsObj, GalleryItemDoc } from "@/types";
import { filterDuple } from "@/utils";
import { MasonryGrid } from "@egjs/react-grid";

interface GalleryDocsObjWithCombine extends GalleryDocsObj {
  combine: GalleryItemDoc[];
}

interface GalleryContainerProps {
  galleryDocs: GalleryDocsObjWithCombine;
}

function filterUniqueTags(obj: GalleryItemDoc[]) {
  const allTags = obj.map((doc) => doc.tags);
  const flat = allTags.flat(2);
  const unique = filterDuple(flat);

  return unique;
}

export default function GalleryContainer(props: GalleryContainerProps) {
  const { galleryDocs } = props;
  const { images, gif, combine } = galleryDocs;

  //render state
  const [renderImageList, setRenderImageList] = useState(combine);
  const [uniqueTags, setUniqueTags] = useState(() => filterUniqueTags(combine));

  useEffect(() => {
    // 만약 필터 기능이 추가된다면 이부분 필터를 고려해야함

    // revalidate시 렌더링 갱신
    setRenderImageList(combine);
    setUniqueTags(filterUniqueTags(combine));
  }, [galleryDocs]);

  return (
    <div className="mt-md">
      <div className="flex justify-between">
        <div className="flex">
          <input
            className="bg-white border text-sm px-xs border-authentic-light"
            placeholder="title or tag..."
          />
        </div>
        <div className="flex">
          <GalleyUploadButton />
        </div>
      </div>
      <div className="flex gap-xs mt-sm text-sm flex-wrap">
        {/* <button className="tag">image</button>
				<button className="tag">gif</button> */}
        {uniqueTags.map((item, idx) => (
          <button key={`tag-${item}`} className="tag text-xs">
            #{item}
          </button>
        ))}
      </div>
      <div className="mt-sm w-full">
        {/* 갤러리 영역 */}
        <MasonryGrid
          column={3}
          gap={5}
          defaultDirection={"end"}
          align={"justify"}
          useResizeObserver={true}
          observeChildren={true}
        >
          {renderImageList.map((i) => (
            <GalleryItem className="rounded-md" key={i.id} doc={i} />
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
}
