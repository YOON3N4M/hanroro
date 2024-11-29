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
      delay: LOGO_DURATION + 0.1 * custom,
      duration: LOGO_DURATION,

      type: "spring",
      stiffness: 50,
    },
  }),
};

function ProfilePanel(props: ProfilePanelProps) {
  const { activePanelIndex, panelIndex } = props;
  const { isPanelActive } = usePanel(activePanelIndex, panelIndex);

  const [isLogoHide, setIsLogoHide] = useState<"initial" | "end">("initial");
  const [innerHeight, setInnerHeight] = useState(0);

  const { scrollY } = useScroll();
  const [isPin, setIsPin] = useState(true);

  const boxY = useTransform(scrollY, [0, innerHeight * 2], [0, innerHeight]);

  const scrollYSpring = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
  });

  const rotate = useTransform(scrollYSpring, [0, 1080], [0, 1080]);
  const opacity = useTransform(scrollYSpring, [0, 100], [0.1, 1]);

  useEffect(() => {
    if (!window) return;

    setInnerHeight(window.innerHeight - 40);
  }, []);
  return (
    <PanelTemplate isPanelActive={isPanelActive}>
      <h3 className="visually-hidden">프로필</h3>
      <div className={cn("size-full relative ")}>
        <div className="w-[80vw] tab:w-screen h-full absolute center mo:py-md tab:inner flex justify-center items-center z-10 mo:flex-col-reverse mo:justify-end">
          <motion.div
            variants={leftFadeInVariant}
            className="flex flex-col h-[500px] mo:h-full"
          >
            <div className="relative h-min mo:mt-md">
              <motion.img
                src="/images/profile/logo.svg"
                className="h-full w-auto absolute top-0 mask"
                variants={logoVariant}
                animate={isLogoHide === "end" ? "hidden" : "visible"}
                onAnimationComplete={() =>
                  setTimeout(() => setIsLogoHide("end"), 100)
                }
              />
              <motion.p
                variants={afterLogoVariant}
                initial="hidden"
                animate={isLogoHide === "end" ? "visible" : "hidden"}
                className="text-[50px] mask mo:text-[32px]"
              >
                한로로
              </motion.p>
            </div>
            <motion.p
              className="w-[80%] mo:w-full mt-md mask mo:text-xs mo:mt-sm"
              variants={afterLogoVariant}
              animate={isLogoHide === "end" ? "visible" : "hidden"}
            >
              다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 그의 작품은
              시작됩니다. 누구보다 자신의 두려움이 크지만, 못지않은 용기로
              한로로는 분연히 시대의 아픔을 관통하고 우리와 유대합니다.
            </motion.p>
            <div className="mt-auto flex gap-lg items-center text-[32px] mo:text-base mo:mt-xxl">
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
            className="size-[500px] tab:size-[450px] max-w-[500px] mo:max-w-full mo:h-auto object-cover mask z-10 pc:ml-auto"
            variants={afterLogoVariant}
            animate={isLogoHide === "end" ? "visible" : "hidden"}
          />
          <motion.div
            layout
            className="cd pc:!size-[120px] tab:!size-[80px] left-0 mo:left-1/2"
            style={{
              position: "absolute",
              top: isPin ? boxY : "auto",
              bottom: isPin ? "auto" : 0,
              x: "-50%",
              opacity: isLogoHide === "initial" ? 0 : opacity,
              rotateY: rotate,
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      </div>
    </PanelTemplate>
  );
}

export default ProfilePanel;
