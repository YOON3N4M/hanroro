import { Album } from "@/types";
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
import Link from "next/link";
import { WheelEvent, useEffect, useState } from "react";

interface NextAlbumSectionProps {
  album: Album;
}

const defaultSize = 80;

function NextAlbumSection(props: NextAlbumSectionProps) {
  const { album } = props;
  const { title, releaseDate, engTitle, cover } = album;

  const { scrollYProgress } = useScroll();
  const [imageHeight, setImageHeight] = useState(defaultSize);
  const value = useSpring(useMotionValue(imageHeight), {
    stiffness: 400,
    damping: 40,
  });
  const template = useMotionTemplate`${value}%`;

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    if (event.deltaY > 0) {
      if (imageHeight <= 100) {
        setImageHeight((prev) => {
          const current = prev + 3;
          value.set(current);
          return current;
        });
      }
    } else {
      setImageHeight((prev) => {
        value.set(defaultSize);
        return defaultSize;
      });
    }

    console.log(imageHeight);
  }

  return (
    <div
      onWheel={onWheel}
      className="mx-[5rem] flex flex-col items-center h-screen overflow-hidden"
    >
      <h3>[NEXT ALBUM]</h3>
      <h2 className="mt-[10rem] text-[3rem] font-medium">{title}</h2>
      <span className="text-[3rem] font-caslon italic mb-[10rem]">
        ({releaseDate.slice(0, 4)})
      </span>
      <div className="flex-1 w-full">
        <Link
          className="flex justify-center items-end h-full"
          href={`/album/${engTitle.toLocaleLowerCase()}`}
        >
          <motion.div
            style={{
              height: template,
              width: template,
            }}
            className="origin-bottom max-w-[50%]"
          >
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
