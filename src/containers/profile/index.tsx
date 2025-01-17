"use client";

import { Carousel } from "@/components/Carousel";
import RotationTextUpMotion from "@/components/motion/RotationTextUpMotion";
import TextupMotion, { customEase } from "@/components/motion/TextupMotion";
import {
  IconArrowRight,
  IconInstagram,
  IconNaver,
  IconSpotify,
  IconYoutube,
} from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { ALBUM_LIST } from "@/data/album";
import { Album, SearchParams } from "@/types";
import { cn, exceptionHandleAlbumHref } from "@/utils";
import { useLenis } from "@studio-freight/react-lenis";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { AnimatePresence, motion } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { useState } from "react";

interface ProfileContainerProps {
  searchParams?: SearchParams;
}

const LINK = [
  { link: "https://www.instagram.com/hanr0r0/?hl=ko", icon: <IconInstagram /> },
  {
    link: "https://www.youtube.com/channel/UCrDa_5OU-rhvXqWlPx5hgKQ",
    icon: <IconYoutube />,
  },
  { link: "https://blog.naver.com/hanr0r0", icon: <IconNaver /> },
  {
    link: "https://open.spotify.com/user/31b5u2b6imqqe6ddalfnqvbpdbbm",
    icon: <IconSpotify />,
  },
];

const maskVariant = {
  hidden: {},
  visible: (custom: number) => ({
    maskSize: "100% 100%",
    transition: { duration: 1.5, ease: customEase, delay: custom * 0.075 },
  }),
};

const carouselItemVariant = {
  hidden: {
    opacity: 1,
  },
  visible: {
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const nameVariant = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      duration: 1,
      delay: custom * 0.25,
    },
  }),
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

export default function ProfileContainer(props: ProfileContainerProps) {
  const { searchParams } = props;

  const [isCarouselAnimateEnd, setIsCarouselAnimateEnd] = useState(false);
  const [hoveredAlbum, setHoveredAlbum] = useState<undefined | string>(
    undefined
  );

  const router = useTransitionRouter();
  const lenis = useLenis();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: true,
      skipSnaps: true,
    },
    [
      WheelGesturesPlugin({
        forceWheelAxis: "y",
      }),
    ]
  );

  function onClickAlbum(album: Album) {
    router.push(exceptionHandleAlbumHref(album.engTitle));
  }

  function onHoverCarousel(isMouseEnter: boolean) {
    console.log(lenis);
    if (isMouseEnter) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }

  return (
    <div className={cn("relative")}>
      <AnimatePresence>
        {hoveredAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            className={cn(
              "size-full absolute -z-10- bg-gradient-to-l via-transparent to-transparent",
              hoveredAlbum && gradientBgStyles[hoveredAlbum]
            )}
            key={`${hoveredAlbum}-bg`}
          />
        )}
      </AnimatePresence>
      <div className="inner h-[100dvh] y-inner">
        <h2 className="visually-hidden">프로필</h2>
        <div className="size-full flex flex-col relative">
          {/* name */}
          <div className="">
            <div className="text-[9rem] tab:text-[4rem] font-medium flex">
              <TextupMotion text={"HANRORO"} />
              {/* <TextupMotion text={"HANRORO"} /> */}
              {/* <RotationTextUpMotion textList={["HANRORO", "한로로"]} /> */}
            </div>
            <div className="text-[7rem] tab:text-[2rem]  font-[100]">
              <RotationTextUpMotion
                textList={["LABEL/AUTHENTIC", "BIRTH/20001111"]}
              />
            </div>
          </div>
          {/* desc, icons */}
          <div className="w-full flex pc:my-auto tab:mt-[3rem]">
            <div className="flex-1">
              {/* <motion.p
              className="text-[2rem]"
              initial={{ opacity: 0 }}
              animate={
                isCarouselAnimateEnd && {
                  opacity: 1,
                  transition: { duration: 1 },
                }
              }
            >
              다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 그의 작품은
              시작됩니다.
              <br className="mo:hidden" /> 누구보다 자신의 두려움이 크지만,{" "}
              못지않은 용기로 한로로는 분연히 시대의 아픔을 관통하고{" "}
              <br className="mo:hidden" /> 우리와 유대합니다.
            </motion.p> */}
            </div>
            <div className="ml-auto pl-[2rem] flex flex-col text-[1.5rem] gap-sm items-end">
              {LINK.map((link, idx) => (
                <motion.div
                  key={link.link}
                  initial={{ opacity: 0 }}
                  animate={
                    isCarouselAnimateEnd && {
                      opacity: 1,
                      transition: { duration: 1 },
                    }
                  }
                  className="brightness-50 hover:brightness-100 transition-all"
                >
                  <NewTabAnchor href={link.link}>{link.icon}</NewTabAnchor>
                </motion.div>
              ))}
            </div>
          </div>
          {/* album carousel */}
          <div
            onMouseEnter={() => onHoverCarousel(true)}
            onMouseLeave={() => onHoverCarousel(false)}
            className="mt-auto mb-md tab:mb-sm"
          >
            <h3 className="visually-hidden">앨범</h3>
            <Carousel emblaRef={emblaRef}>
              {ALBUM_LIST.map((album, idx) => (
                <div
                  onClick={() => onClickAlbum(album)}
                  onMouseEnter={() => setHoveredAlbum(album.engTitle)}
                  onMouseLeave={() => setHoveredAlbum(undefined)}
                  key={album.engTitle}
                  className={cn(
                    "basis-[20%] relative cursor-pointer tab:basis-[45%] flex shrink-0 ml-md tab:ml-sm"
                  )}
                >
                  <div className="size-full">
                    <motion.span
                      className="flex flex-col-reverse"
                      variants={carouselItemVariant}
                      initial="hidden"
                      animate={"visible"}
                    >
                      <motion.div
                        variants={maskVariant}
                        custom={idx}
                        className="size-full mask aspect-square mt-sm"
                        onAnimationComplete={() =>
                          idx === 1 && setIsCarouselAnimateEnd(true)
                        }
                      >
                        <Image
                          src={album.cover.src}
                          width={album.cover.width}
                          height={album.cover.height}
                          alt={album.title}
                          className="size-full brightness-50 hover:brightness-100 transition-all"
                        />
                      </motion.div>
                      <motion.span
                        className="text-sm font-extralight"
                        variants={nameVariant}
                        custom={idx}
                      >
                        {album.title}
                      </motion.span>
                    </motion.span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      {/* <div className="h-screen inner">
        <h3 className="visually-hidden">로노추/로책추</h3>
        <Recommended />
      </div> */}
    </div>
  );
}

// function Recommended() {
//   return <div className="size-full">
//     <div></div>
//   </div>;
// }
