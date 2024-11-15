import { IconYoutube } from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { ALBUM_LIST } from "@/data/album";
import { Track } from "@/types";
import { cn, getYoutubeIdFromUrl } from "@/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import YouTube from "react-youtube";
import { PanelProps } from "./type";

interface AlbumPanelProps extends PanelProps {}

const variants = {
  enter: (custom: number) => ({
    opacity: 1,
    transition: { delay: custom * 0.15 },
  }),
  exit: {
    opacity: 0,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }, // 각 자식 요소가 0.3초 간격으로 등장
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // 처음에는 위에서 살짝 떨어져 있다가
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 }, // 자연스러운 스프링 애니메이션
  },
};

function AlbumPanel(props: AlbumPanelProps) {
  const { activePanelIndex, panelIndex } = props;
  const [activeAlbumIndex, setActiveAlbumIndex] = useState<number | null>(null);

  const albumContainerRef = useRef<HTMLDivElement>(null);

  const isViewActive = activePanelIndex === panelIndex;
  const isAlbumSelected = activeAlbumIndex !== null;
  const selectedAlbum = isAlbumSelected && ALBUM_LIST[activeAlbumIndex];
  const titileYoutubeId =
    selectedAlbum &&
    selectedAlbum.trackList[0] &&
    getYoutubeIdFromUrl(selectedAlbum.trackList[0].youtubeUrl);

  function onClickAlbum(idx: number) {
    if (activeAlbumIndex === idx) {
      setActiveAlbumIndex(null);
      return;
    }
    scrollToAlbum(ALBUM_LIST[idx].title, !isAlbumSelected);
    setActiveAlbumIndex(idx);
  }

  function scrollToAlbum(id: string, delay: boolean) {
    if (!albumContainerRef.current) return;
    const el = albumContainerRef.current;
    const target = el.querySelector(`#${id}`);
    if (!target) return;

    if (delay) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="size-full relative">
      {/* album grid */}
      <div className="w-[80vw] tab:w-screen h-full absolute center flex gap-md">
        <div
          ref={albumContainerRef}
          className={cn(
            "relative  overflow-x-visible",
            isAlbumSelected
              ? "flex flex-col w-[300px] pc:!h-full pc:overflow-y-auto gap-sm tab:flex-row tab:h-[300px] tab:overflow-x-auto tab:w-full"
              : "grid grid-cols-5 tab:grid-cols-3 h-screen-nav"
          )}
        >
          {ALBUM_LIST.map((album, idx) => (
            <motion.div
              id={album.title}
              layout
              custom={idx}
              key={album.title}
              variants={variants}
              initial="exit"
              animate={isViewActive ? "enter" : "exit"}
              className={cn(
                // "aspect-square",
                // activeAlbumIndex !== null && "absolute top-[20%]",
                idx == activeAlbumIndex && "z-[10]"
              )}
            >
              <button className="size-full" onClick={() => onClickAlbum(idx)}>
                <Image
                  src={album.cover.src}
                  height={1000}
                  width={1000}
                  alt={album.title}
                  className={cn(
                    "object-cover brightness-50 transition-all hover:brightness-100",
                    activeAlbumIndex === idx && "!brightness-100"
                  )}
                />
              </button>
            </motion.div>
          ))}
        </div>
        <div className="flex-1 text-white p-md">
          <div className="w-min min-w-[50%]">
            {selectedAlbum && (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col"
                >
                  <motion.h2 className="text-lg" variants={itemVariants}>
                    {selectedAlbum.title}
                  </motion.h2>
                  <motion.span
                    className="text-sm opacity-80"
                    variants={itemVariants}
                  >
                    {albumTypeStr(selectedAlbum.type)}
                  </motion.span>
                  {/* title youtube */}
                  <motion.div className="mt-md" variants={itemVariants}>
                    <h2>타이틀</h2>
                    {titileYoutubeId && (
                      <YouTube videoId={titileYoutubeId} className="mt-sm" />
                    )}
                  </motion.div>
                  <div className="mt-md">
                    <motion.h3 className="text-sm" variants={itemVariants}>
                      트랙 리스트
                    </motion.h3>
                    <div className="mt-sm gap-xs">
                      {selectedAlbum.trackList.map((track, idx) => (
                        <TrackItem
                          key={`${selectedAlbum.title}-${track.title}`}
                          track={track}
                          idx={idx}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumPanel;

function albumTypeStr(str: string) {
  if (str === "single") return "디지털 싱글";
  return str;
}

function TrackItem({ track, idx }: { track: Track; idx: number }) {
  const { title, duration } = track;

  const [isHover, setIsHover] = useState(false);

  function onHover() {
    setIsHover((prev) => !prev);
  }

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      variants={itemVariants}
      className="flex gap-sm py-xxs px-xs items-center text-sm border-b"
    >
      <span>{idx + 1}</span>
      <h3 className="text-">{title}</h3>
      <div className="ml-auto flex items-center">
        {!isHover ? (
          <span className="ml-auto">{duration}</span>
        ) : (
          <NewTabAnchor href="">
            <IconYoutube />
          </NewTabAnchor>
        )}
      </div>
    </motion.div>
  );
}
