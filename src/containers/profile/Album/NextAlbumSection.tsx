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

const defaultSize = 50;

function NextAlbumSection(props: NextAlbumSectionProps) {
  const { album } = props;

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
      <h3>[NEXT PROJECT]</h3>
      <h2 className="mt-[10rem] text-[7rem] font-medium">
        {work.title.toUpperCase()}
      </h2>
      <span className="text-[7rem] font-caslon italic mb-[10rem]">
        ({work.year})
      </span>
      <div className="flex-1 w-full">
        <Link
          className="flex justify-center items-end h-full"
          href={`/case/${translateWorkTitle(work.title)}`}
        >
          <motion.div
            style={{
              height: template,
              width: template,
            }}
            className="origin-bottom max-w-[50%]"
          >
            <Image
              src={work.overlaySrc}
              className="size-full object-cover"
              alt={work.title}
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
