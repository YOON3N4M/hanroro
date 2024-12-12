import { ALBUM_LIST } from "@/data/album";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { takeOff } from "../../../public/images/album";
import { Album } from "@/types";

interface InformationSectionProps {
  album: Album;
}

function InformationSection(props: InformationSectionProps) {
  const { album } = props;
  const { desc, cover, trackList } = album;
  return (
    <div className="mb-[20rem] inner">
      <div className="flex gap-xxl tab:flex-col">
        <div className="flex justify-center">
          <Image
            width={cover.width}
            height={cover.height}
            src={cover.src}
            alt={album.title}
            className="pc:size-[300px] tab:w-[80%] tab::h-auto aspect-square"
          />
        </div>
        <div className="max-w-[520px] flex flex-col gap-xl tab:text-sm">
          <div className="flex tab:flex-col tab:gap-sm">
            <div className="basis-[20%] shrink-0">
              <h3>[앨범 소개]</h3>
            </div>
            <div className="">
              <p className="">{desc}</p>
            </div>
          </div>
          <div className="flex tab:flex-col tab:gap-sm">
            <div className="basis-[20%]">
              <h3>[수록곡]</h3>
            </div>
            <div className="flex flex-col">
              {trackList.map((track, idx) => (
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

export default InformationSection;
