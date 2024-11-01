import { Album } from "@/types";
import Image from "next/image";

interface AlbumItemProps {
  album: Album;
}

function AlbumItem(props: AlbumItemProps) {
  const { album } = props;
  const { title, cover } = album;

  return (
    <div className="w-[300px]">
      <div className="relative">
        <div className="size-1/5 absolute center bg-white rounded-full"></div>
        <Image src={cover.src} width={cover.width} height={cover.height} className="size-[150px]" />
      </div>
    </div>
  );
}

export default AlbumItem;
