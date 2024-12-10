import Image from "next/image";
import { motion } from "motion/react";

interface VideoSectionProps {
  src: string;
  overlaySrc?: string;
}

function VideoSection(props: VideoSectionProps) {
  const { src, overlaySrc } = props;

  return (
    <div className="relative inner mb-[15rem]">
      {/* overlayImage */}
      {overlaySrc && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { delay: 0.7, duration: 0.7 } }}
          className="absolute top-0 left-0 size-full px-[5rem]"
        >
          <div className="size-full">
            <Image
              src={overlaySrc}
              width={2000}
              height={2000}
              alt="overlay"
              className="size-full object-cover"
            />
          </div>
        </motion.div>
      )}
      <div className="w-full">
        <video className="size-full" autoPlay loop muted>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default VideoSection;
