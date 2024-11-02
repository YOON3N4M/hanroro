import AlbumItem from "@/components/AlbumItem";
import { ALBUM_LIST } from "@/data/album";
import React from "react";

const reversed = [...ALBUM_LIST].reverse();

export default function AlbumContainer() {
  return (
    <div className="mt-md">
      <div className="font-light text-sm">ALBUM</div>
      <div className="mt-sm flex flex-col gap-[80px]">
        {reversed.map((album) => (
          <AlbumItem key={`${album.title}-${album.type}`} album={album} />
        ))}
      </div>
    </div>
  );
}
