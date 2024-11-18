import { IconYoutube } from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { ALBUM_LIST } from "@/data/album";
import { Album, Track } from "@/types";
import { cn, getYoutubeIdFromUrl } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { PanelProps, PanelTemplate, usePanel } from ".";
import LoadingSpinner from "@/components/LoadingSpinner";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";

interface AlbumPanelProps extends PanelProps {}

const albumCoverVariant = {
  visible: (custom: number) => ({
    opacity: 1,
    transition: { delay: custom * 0.15 },
  }),
  hidden: {
    opacity: 0,
  },
};

const albumInfoVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const infoItemVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.3 }, // 각 자식 요소가 0.3초 간격으로 등장
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 }, // 처음에는 위에서 살짝 떨어져 있다가
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 50 }, // 자연스러운 스프링 애니메이션
//   },
// };

const gradientBgStyles: { [key in any]: string } = {
  letMeLoveMyYouth: "from-[#ffffff60]",
  mirror: "from-[#dd000063]",
  dontBeAfraidToFall: "from-[#e0d10060]",
  theLastStopOfPain: "from-[#c8e0f16c]",
  evenIfYouLeave: "from-[#6ea7ca6b]",
  takeOff: "from-[#0909f289]",
  mayfly: "from-[#edb16c4f]",
  systemError: "from-[#bf062557]",
  howToGoOn: "from-[#bf062573]",
  home: "from-[#bf06258a]",
  theCompass: "from-[#092a01]",
};

function AlbumPanel(props: AlbumPanelProps) {
  const { activePanelIndex, panelIndex } = props;
  const { isPanelActive } = usePanel(activePanelIndex, panelIndex);

  const [isIntroEnd, setIsIntroEnd] = useState(false);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState<number | null>(null);
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  const isAlbumSelected = activeAlbumIndex !== null;
  const selectedAlbum = isAlbumSelected && ALBUM_LIST[activeAlbumIndex];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      active: false,
      align: "start",
      axis: "y",
      dragFree: true,
    },
    [ClassNames({ snapped: "active-slide" })]
  );

  function onClickAlbum(idx: number) {
    if (!isIntroEnd) return;

    if (activeAlbumIndex === idx) {
      setActiveAlbumIndex(null);
      setIsCarouselMode(false);
      return;
    }
    setIsCarouselMode(true);
    setTimeout(() => {
      if (emblaApi) {
        emblaApi.scrollTo(idx);
      }
    }, 500);
    // scrollToAlbum(ALBUM_LIST[idx].title, !isAlbumSelected);
    setActiveAlbumIndex(idx);
  }

  useEffect(() => {
    if (!isPanelActive) {
      setActiveAlbumIndex(null);
      setIsCarouselMode(false);
    }
    console.log(isPanelActive);
  }, [isPanelActive]);

  return (
    <PanelTemplate
      isPanelActive={isPanelActive}
      className={cn(
        "",
        selectedAlbum && gradientBgStyles[selectedAlbum.engTitle]
      )}
    >
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            className={cn(
              "size-full absolute -z-10- bg-gradient-to-l via-transparent to-transparent",
              selectedAlbum && gradientBgStyles[selectedAlbum.engTitle]
            )}
            key={`${selectedAlbum.title}-bg`}
          />
        )}
      </AnimatePresence>
      <h3 className="visually-hidden">앨범</h3>
      <div className={cn("size-full relative")}>
        <div className="w-[80vw] tab:w-screen h-full absolute center flex gap-[10%]">
          {/* album grid */}
          <div className="relative" ref={emblaRef}>
            <div
              className={cn(
                "relative",
                isCarouselMode
                  ? "flex flex-col w-[300px] pc:!h-full  gap-sm tab:flex-row tab:h-[300px] tab:overflow-x-auto tab:w-full"
                  : "grid grid-cols-5 tab:grid-cols-3 h-screen-nav"
              )}
            >
              {ALBUM_LIST.map((album, idx) => (
                <motion.div
                  id={album.title}
                  layout
                  custom={idx}
                  key={album.title}
                  variants={albumCoverVariant}
                  initial="hidden"
                  animate={isPanelActive ? "visible" : "hidden"}
                  className={cn(
                    "relative",
                    "aspect-square",
                    // activeAlbumIndex !== null && "absolute top-[20%]",
                    idx == activeAlbumIndex && "z-[10]"
                  )}
                  onAnimationComplete={
                    idx === ALBUM_LIST.length - 1
                      ? () => {
                          setIsIntroEnd(true);
                          if (emblaApi) {
                            emblaApi.reInit({ active: true });
                          }
                        }
                      : undefined
                  }
                >
                  {/* cd shape */}
                  <motion.div
                    className="absolute y-center size-[80%]"
                    initial={{ marginLeft: 0, opacity: 0 }}
                    animate={
                      idx === activeAlbumIndex
                        ? { marginLeft: "60%", opacity: 1 }
                        : { marginLeft: 0, opacity: 0 }
                    }
                  >
                    <div className="cd"></div>
                  </motion.div>
                  <button
                    className="size-full"
                    onClick={() => onClickAlbum(idx)}
                  >
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
          </div>
          {/* album info */}
          {selectedAlbum && <AlbumInfo album={selectedAlbum} />}
          {/* <div className="flex-1 text-white p-md">
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
          </div> */}
        </div>
      </div>
    </PanelTemplate>
  );
}

export default AlbumPanel;

function albumTypeStr(str: string) {
  if (str === "single") return "디지털 싱글";
  return str;
}

function AlbumInfo({ album }: { album: Album }) {
  const { title, type, releaseDate, trackList, desc } = album;

  const [isLoad, setIsLoad] = useState(false);

  const titleTrack = album.trackList.find((item) => item.isTitle);
  const titileYoutubeId =
    titleTrack && getYoutubeIdFromUrl(titleTrack.youtubeUrl);

  function onYoutbeLoad() {
    setIsLoad(true);
  }

  return (
    <motion.div
      // key를 부여해서 앨범이 변경될때 마다 모션이 새로고침 될 수 있도록
      key={title}
      className="flex-1 text-white p-md flex flex-col"
      variants={albumInfoVariant}
      initial="hidden"
      animate={isLoad ? "visible" : "hidden"}
      exit="hidden"
    >
      {/* title type date */}
      <motion.div
        variants={infoItemVariant}
        className="flex items-center gap-xs"
      >
        <motion.h3
          variants={infoItemVariant}
          className="text-[50px] font-extralight"
        >
          {title}
        </motion.h3>
        <motion.span variants={infoItemVariant}>
          {albumTypeStr(type)}
        </motion.span>
        <motion.span variants={infoItemVariant}>
          {releaseDate.slice(0, 4)}
        </motion.span>
      </motion.div>
      {/* desc */}
      <motion.div className="mt-md" variants={infoItemVariant}>
        <motion.p className="font-light max-w-[50%]" variants={infoItemVariant}>
          {desc}
        </motion.p>
      </motion.div>
      {/* youtube */}
      <motion.div className="mt-md" variants={infoItemVariant}>
        <YouTube
          videoId={titileYoutubeId}
          className="mt-sm"
          onReady={onYoutbeLoad}
        />
      </motion.div>

      {/* track list */}
      <motion.div className="mt-md" variants={infoItemVariant}>
        {trackList.map((track, idx) => (
          <motion.div
            key={`tracklist-${track.title}`}
            variants={infoItemVariant}
          >
            <span>{idx + 1}. </span>
            <span>{track.title}</span>
            {track.isTitle && (
              <span className="ml-xs text-xs opacity-80">타이틀</span>
            )}
          </motion.div>
        ))}
      </motion.div>
      {/* <motion.div variants={infoItemVariant}>3</motion.div> */}
    </motion.div>
  );
}
