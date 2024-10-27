import GalleryItem from "@/components/GalleryItem";
import React from "react";
import GalleyUploadButton from "./Upload";

const testArr = [
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 7, 8, 1, 2, 3, 7, 8, 1, 2, 3, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,
];

export default function GalleryContainer() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <GalleyUploadButton />
        </div>
        <div>
          <input className="bg-black" />
        </div>
      </div>
      <div className="flex gap-sm">
        <button>#AAA</button>
        <button>#BBB</button>
        <button>#CCC</button>
      </div>
      <div className="">
        {/* 갤러리 영역 */}
        <div className="grid grid-cols-4 gap-xxxs mt-sm">
          {testArr.map((i) => (
            <GalleryItem className="aspect-[1/1] rounded-md" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
