import { cn } from "@/utils";
import { PanelProps, PanelTemplate, usePanel } from ".";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import {
  IconInstagram,
  IconNaver,
  IconSpotify,
  IconYoutube,
} from "@/components/svg";
import { useEffect, useState } from "react";
import { delay } from "motion";

interface ProfilePanelProps extends PanelProps {}

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

const leftFadeInVariant = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};
/////////
const LOGO_DELAY = 1;
const LOGO_DURATION = 0.5;

const logoVariant = {
  hidden: {
    maskSize: "0%",
    maskPosition: "right center",
    transition: {
      duration: LOGO_DURATION,
    },
  },
  visible: {
    maskSize: "100%",
    maskPosition: "left center",
    transition: {
      duration: LOGO_DURATION,
      delay: LOGO_DELAY,
      type: "spring",
      stiffness: 50,
    },
  },
};

const afterLogoVariant = {
  hidden: {
    maskSize: "0%",
  },
  visible: {
    maskSize: "100%",
    maskPosition: "left center",
    transition: {
      duration: LOGO_DURATION,
      delay: 0.1,
      type: "spring",
      stiffness: 50,
    },
  },
};

const iconVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: LOGO_DURATION,
      delay: 0.2 * custom,
      type: "spring",
      stiffness: 50,
    },
  }),
};

function ProfilePanel(props: ProfilePanelProps) {
  const { activePanelIndex, panelIndex } = props;
  const { isPanelActive } = usePanel(activePanelIndex, panelIndex);

  const [isLogoHide, setIsLogoHide] = useState<"initial" | "end">("initial");

  const { scrollY } = useScroll();
  const [isPin, setIsPin] = useState(true);

  const boxY = useTransform(
    scrollY,
    [0, window.innerHeight],
    [0, window.innerHeight]
  );

  const scrollYSpring = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
  });

  const scale = useTransform(scrollYSpring, [0, 100], [12, 1]);
  const opacity = useTransform(scrollYSpring, [0, 100], [0.1, 1]);
  const rotate = useTransform(scrollYSpring, [0, 100], [30, 0]);
  const maskSize = useTransform(scrollY, [0, 100], [0, 100]);

  useEffect(() => {
    console.log(isLogoHide);
  }, [isLogoHide]);
  return (
    <PanelTemplate isPanelActive={isPanelActive}>
      <h3 className="visually-hidden">프로필</h3>
      <div className={cn("size-full relative ")}>
        <div className="w-[80vw] tab:w-screen h-full absolute center tab:inner flex justify-center items-center z-10">
          <motion.div
            variants={leftFadeInVariant}
            className="flex flex-col h-[500px]"
          >
            <div className="relative h-min">
              <motion.img
                src="/images/profile/logo.svg"
                className="h-full w-auto absolute top-0 mask"
                variants={logoVariant}
                animate={isLogoHide === "end" ? "hidden" : "visible"}
                onAnimationComplete={() =>
                  setTimeout(() => setIsLogoHide("end"), 100)
                }
              />
              <motion.span
                variants={afterLogoVariant}
                initial="hidden"
                animate={isLogoHide === "end" ? "visible" : "hidden"}
                className="text-[50px] mask"
              >
                한로로
              </motion.span>
            </div>
            <motion.p
              className="w-[80%] mt-md mask"
              variants={afterLogoVariant}
              animate={isLogoHide === "end" ? "visible" : "hidden"}
            >
              다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 그의 작품은
              시작됩니다. 누구보다 자신의 두려움이 크지만, 못지않은 용기로
              한로로는 분연히 시대의 아픔을 관통하고 우리와 유대합니다.
            </motion.p>
            <div className="mt-auto flex gap-lg items-center text-[32px]">
              {LINK.map((link, idx) => (
                <motion.div
                  variants={iconVariant}
                  initial="hidden"
                  animate={isLogoHide === "end" ? "visible" : "hidden"}
                  key={link.link}
                  custom={idx}
                >
                  <NewTabAnchor href={link.link}>{link.icon}</NewTabAnchor>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.img
            src="/images/profile/profile.jpg"
            alt="한로로 프로필 이미지"
            className="size-[500px] max-w-[500px] object-cover mask z-10 ml-auto"
            variants={afterLogoVariant}
            animate={isLogoHide === "end" ? "visible" : "hidden"}
          />
          <motion.div
            layout
            className="cd"
            style={{
              position: "absolute",
              top: isPin ? boxY : "auto",
              bottom: isPin ? "auto" : 0,
              left: "50%",
              width: "100px",
              height: "100px",
              x: "-50%",
              opacity: isLogoHide === "initial" ? 0 : opacity,
            }}
          />
        </div>
      </div>
    </PanelTemplate>
  );
}

export default ProfilePanel;
