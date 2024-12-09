import { ALBUM_LIST } from "@/data/album";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { takeOff } from "../../../../public/images/album";
import { Album } from "@/types";

interface InfromationSectionProps {
  album: Album;
}

function InfromationSection(props: InfromationSectionProps) {
  const { album } = props;
  const { desc, cover } = album;
  return (
    <div className="mb-[20rem] px-[5rem] flex flex-col">
      <div className="flex gap-xxl">
        <div className="basis-[25%]">
          <Image
            width={cover.width}
            height={cover.height}
            src={cover.src}
            alt={album.title}
          />
        </div>
        <div className="flex-1 flex flex-col gap-xl">
          <div className="flex">
            <div className="basis-[20%] shrink-0">
              <span>[앨범 소개]</span>
            </div>
            <div className="">
              <p className="">{desc}</p>
            </div>
          </div>
          <div className="flex">
            <div className="basis-[20%]">
              <span>[수록곡]</span>
            </div>
            <div className="flex flex-col">
              {ALBUM_LIST[5].trackList.map((track, idx) => (
                <div key={track.title} className="flex gap-xxs">
                  <span>{idx + 1}. </span>
                  <span>{track.title}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 
          <div className="flex mt-[5rem]">
            <div className="basis-[60%] flex flex-col">
              <div className="flex">
                <div className="basis-[45%]">
                  <span>[수록곡]</span>
                </div>
                <div className="basis-[55%] flex flex-col">
                  {ALBUM_LIST[5].trackList.map((track, idx) => (
                    <div key={track.title} className="flex gap-xxs">
                      <span>{idx + 1}. </span>
                      <span>{track.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default InfromationSection;
