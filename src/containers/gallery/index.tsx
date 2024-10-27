"use client";

import GalleryItem from "@/components/GalleryItem";
import React, { useEffect, useState } from "react";
import GalleyUploadButton from "./Upload";
import { getAllGifs, getAllImages } from "@/services/firebase";

import { MasonryGrid } from "@egjs/react-grid";

export default function GalleryContainer() {
  const [combinedList, setCombinedList] = useState<any[]>([]);
  const [gifs, setGifs] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    async function init() {
      const imagesRes = await getAllImages();
      const gifsRes = await getAllGifs();

      if (!imagesRes) return;
      if (!gifsRes) return;

      setImages(imagesRes);
      setGifs(gifsRes);

      setCombinedList([...imagesRes, ...gifsRes]);
    }
    init();
  }, []);

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
        <MasonryGrid column={3} gap={5} defaultDirection={"end"} align={"justify"}>
          {combinedList.map((i) => (
            <GalleryItem className="rounded-md" key={i.id} doc={i} />
          ))}
        </MasonryGrid>
        {/* <div className="flex gap-xxxs mt-sm items-start">
          {combinedList.map((i) => (
            <GalleryItem className="rounded-md" key={i.id} doc={i} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
