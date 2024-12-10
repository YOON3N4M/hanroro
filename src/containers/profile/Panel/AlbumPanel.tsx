import LoadingSpinner from "@/components/LoadingSpinner";
import { ALBUM_LIST } from "@/data/album";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { Album, SearchParams } from "@/types";
import { cn, exceptionHandleAlbumHref, getYoutubeIdFromUrl } from "@/utils";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { PanelProps, PanelTemplate, usePanel } from ".";
import { useRouter } from "next/navigation";

interface AlbumPanelProps extends PanelProps {
  searchParams?: SearchParams;
}

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
    transition: { staggerChildren: 0.3, delayChildren: 0 },
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
  const { activePanelIndex, panelIndex, searchParams } = props;
  const { isPanelActive } = usePanel(activePanelIndex, panelIndex);

  const router = useRouter();

  const [isIntroEnd, setIsIntroEnd] = useState(false);

  function onClickAlbum(idx: number) {
    const album = ALBUM_LIST[idx];
    const handleEarly = ["systemError", "howToGoOn"];
    const href = exceptionHandleAlbumHref(album.engTitle);
    router.push(href);
  }

  return (
    <PanelTemplate
      isPanelActive={isPanelActive}
      className={cn(
        ""
        // selectedAlbum && gradientBgStyles[selectedAlbum.engTitle]
      )}
    >
      {/* <AnimatePresence>
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
      </AnimatePresence> */}
      <h3 className="visually-hidden">앨범</h3>
      <div className={cn("size-full relative tab:inner")}>
        <div
          className={cn(
            "w-[80vw] tab:w-full h-full absolute tab:relative center flex pc:gap-[10%] tab:flex-col",
            "tab:justify-center"
          )}
        >
          {/* album grid */}
          <div className={cn("pc:flex items-center relative")}>
            <div
              className={cn(
                "relative",

                "grid grid-cols-5 tab:grid-cols-4 mo:!grid-cols-3 h-min "
              )}
            >
              {ALBUM_LIST.map((album, idx) => (
                <motion.button
                  id={album.title}
                  layout
                  custom={idx}
                  key={album.title}
                  variants={albumCoverVariant}
                  initial="hidden"
                  animate={isPanelActive ? "visible" : "hidden"}
                  onClick={() => onClickAlbum(idx)}
                  className={cn(
                    "relative tab:shrink-0 h-min",
                    "aspect-square"
                    // activeAlbumIndex !== null && "absolute top-[20%]",
                  )}
                >
                  <Image
                    src={album.cover.src}
                    height={1000}
                    width={1000}
                    alt={album.title}
                    className={cn(
                      "object-cover brightness-50 transition-all hover:brightness-100"
                    )}
                  />
                </motion.button>
              ))}
            </div>
          </div>
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
  const { isPc } = useDeviceDetect();
  const titleTrack = album.trackList.find((item) => item.isTitle);
  const titileYoutubeId =
    titleTrack && getYoutubeIdFromUrl(titleTrack.youtubeUrl);

  const opts = !isPc ? { width: "100%" } : { width: 640, height: 360 };

  function onYoutbeLoad() {
    setIsLoad(true);
  }

  useEffect(() => {
    setIsLoad(false);
  }, [album]);

  return (
    <div className="flex-1 text-white p-md !pb-[100px] flex flex-col relative overflow-y-auto">
      {!isLoad && (
        <LoadingSpinner absolute white className="pointer-events-none z-50" />
      )}
      <motion.div
        // key를 부여해서 앨범이 변경될때 마다 모션이 새로고침 될 수 있도록
        key={title}
        // className="flex-1 text-white p-md flex flex-col"
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
            className="text-[50px] tab:text-[30px] font-extralight"
          >
            {title}
          </motion.h3>
          <motion.span className="tab:text-sm" variants={infoItemVariant}>
            {albumTypeStr(type)}
          </motion.span>
          <motion.span className="tab:text-sm" variants={infoItemVariant}>
            {releaseDate.slice(0, 4)}
          </motion.span>
        </motion.div>
        {/* desc */}
        <motion.div className="mt-md" variants={infoItemVariant}>
          <motion.p
            className="font-light max-w-[640px] tab:max-w-[90%] tab:text-sm"
            variants={infoItemVariant}
          >
            {desc}
          </motion.p>
        </motion.div>
        {/* youtube */}
        <motion.div className="mt-md" variants={infoItemVariant}>
          <YouTube
            videoId={titileYoutubeId}
            className="mt-sm"
            opts={opts}
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
      </motion.div>
    </div>
  );
}
