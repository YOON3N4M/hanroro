import { customEase } from "@/components/motion/TextupMotion";
import { Album } from "@/types";
import { exceptionHandleAlbumHref } from "@/utils";
import { motionValue } from "motion";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { WheelEvent, useEffect, useState } from "react";

interface NextAlbumSectionProps {
  album: Album;
}

const defaultSize = 80;

function NextAlbumSection(props: NextAlbumSectionProps) {
  const { album } = props;
  const { title, releaseDate, engTitle, cover } = album;

  return (
    <div className="inner flex flex-col items-center pt-[10rem] h-screen overflow-hidden">
      <h2>[NEXT ALBUM]</h2>
      <h3 className="mt-[7rem] text-[3rem] font-medium">{title}</h3>
      <span className="text-[3rem] font-caslon italic mb-[7rem]">
        ({releaseDate.slice(0, 4)})
      </span>
      <div className="flex-1 w-full">
        <Link
          className="flex justify-center items-end h-full"
          href={exceptionHandleAlbumHref(engTitle)}
        >
          <motion.div className="size-[300px]">
            <Image
              src={cover.src}
              className="size-full object-cover"
              alt={title}
              width={1000}
              height={1000}
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default NextAlbumSection;
