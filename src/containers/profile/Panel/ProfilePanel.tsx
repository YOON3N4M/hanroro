import TextupMotion, {
  customEase,
  textupVariant,
} from "@/components/motion/TextupMotion";
import {
  IconInstagram,
  IconNaver,
  IconSpotify,
  IconYoutube,
} from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { cn } from "@/utils";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PanelProps, PanelTemplate, usePanel } from ".";

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

//2.0
const profileImageVariant = {
  hidden: {
    height: 0,
    width: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  visible: (isPc: boolean) => ({
    height: isPc ? 500 : 350,
    width: isPc ? 300 : 150,
    marginRight: 10,
    marginLeft: 10,
    transition: {
      height: { duration: 0 },
      width: { duration: 1.5, ease: customEase },
      padding: { duration: 1.5, ease: customEase },
    },
  }),
};

const textSectionVariant = {
  hidden: {
    display: "none",
  },
  visible: {
    display: "flex",
  },
};

function ProfilePanel(props: ProfilePanelProps) {
  const { activePanelIndex, panelIndex } = props;
  const { isPanelActive } = usePanel(activePanelIndex, panelIndex);
  const { isPc } = useDeviceDetect();

  const [innerHeight, setInnerHeight] = useState(2000);

  const { scrollY } = useScroll();

  const [isPin, setIsPin] = useState(true);

  const boxY = useTransform(
    scrollY,
    [0, isPc ? innerHeight - 100 : innerHeight],
    [-innerHeight, 0]
  );

  const springY = useSpring(boxY, {
    stiffness: 300,
    damping: 40,
  });
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
  });
  // 이름 등

  //2.0
  const [isTextUpEnd, setIsTextUpEnd] = useState(false);
  const [isimageEnd, setIsImageEnd] = useState(false);
  const [isTextSectionEnd, setIsTextSectionEnd] = useState(false);

  useEffect(() => {
    if (!window) return;

    setInnerHeight(window.innerHeight - 40);
  }, []);

  // useEffect(() => {
  //   if (!activePanelIndex) {
  //     setIsTextUpEnd(false);
  //     setIsImageEnd(false);
  //     setIsTextSectionEnd(false);
  //   }
  // }, [activePanelIndex]);
  return (
    <PanelTemplate isPanelActive={isPanelActive}>
      <h3 className="visually-hidden">프로필</h3>
      <div className={cn("size-full relative pt-md tab:inner")}>
        {/* <motion.div
          layout
          className="cd pc:!size-[120px] tab:!size-[80px] left-[10%] mo:left-1/2"
          style={{
            position: "absolute",
            top: isPin ? boxY : "auto",
            bottom: isPin ? "auto" : 0,
            x: "-50%",
            opacity: !isTextSectionEnd ? 0 : opacity,
            rotateY: rotate,
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        /> */}
        <div
          className={cn(
            "w-[80vw] tab:w-full h-full absolute tab:relative center flex pc:gap-[10%] tab:flex-col"
          )}
        >
          <div className="size-full pt-md relative flex flex-col">
            <div className="absolute"></div>
            <Curtain isPin={isPin} y={springY} />
            {/* 인트로 박스 */}
            <motion.div
              className={cn(
                "flex h-min overflow-hidden ",
                isimageEnd ? "items-start" : "items-center mx-auto my-auto"
              )}
            >
              <MotionText
                text="H"
                idx={0}
                onAnimationComplete={setIsTextUpEnd}
              />
              <MotionText
                text="A"
                idx={1}
                onAnimationComplete={setIsTextUpEnd}
              />
              <MotionText
                text="N"
                idx={2}
                onAnimationComplete={setIsTextUpEnd}
              />
              <motion.div
                //className="h-[500px]"
                custom={isPc}
                layout
                transition={{
                  duration: isimageEnd ? 2 : 0.3,
                  ease: customEase,
                }}
                variants={profileImageVariant}
                initial={"hidden"}
                animate={isTextUpEnd ? "visible" : "hidden"}
                onAnimationComplete={() => setIsImageEnd(true)}
                className={cn(isimageEnd && "absolute left-0 top-1/2")}
              >
                <Image
                  src="/images/profile/profile.jpg"
                  alt="한로로 프로필 이미지"
                  width={1000}
                  height={1000}
                  className="size-full object-cover"
                />
              </motion.div>
              <MotionText
                text="R"
                idx={3}
                onAnimationComplete={setIsTextUpEnd}
              />
              <MotionText
                text="O"
                idx={4}
                onAnimationComplete={setIsTextUpEnd}
              />
              <MotionText
                text="R"
                idx={5}
                onAnimationComplete={setIsTextUpEnd}
              />
              <MotionText
                text="O"
                idx={6}
                onAnimationComplete={setIsTextUpEnd}
              />
            </motion.div>
            {/* 텍스트 섹션 */}
            <motion.div
              variants={textSectionVariant}
              initial="hidden"
              animate={isimageEnd ? "visible" : "hidden"}
              className="flex flex-1 flex-col items-end"
              onAnimationComplete={() => setIsTextSectionEnd(true)}
            >
              {" "}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isTextSectionEnd && {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.2, ease: customEase },
                  }
                }
                className="text-right mo:text-sm mo:mt-md"
              >
                다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 <br /> 그의
                작품은 시작됩니다. 누구보다 자신의 두려움이 크지만, <br />
                못지않은 용기로 한로로는 분연히 시대의 아픔을 관통하고 우리와
                유대합니다.
              </motion.p>
              <motion.div className="flex text-[30px] mo:text-[15px] mt-lg gap-sm">
                {LINK.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isTextSectionEnd && {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 1.2,
                          ease: customEase,
                          delay: idx * 0.2,
                        },
                      }
                    }
                    key={link.link}
                    custom={idx}
                  >
                    <NewTabAnchor href={link.link}>{link.icon}</NewTabAnchor>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-auto">
                <motion.div className="relative h-[50px] mo:h-[30px] font-thin text-[70px] mo:text-[30px]  italic">
                  <TextupMotion isAnimate={isTextSectionEnd} text="20001111" />
                </motion.div>
                <motion.div className="h-[70px] font-thin text-[50px] mo:text-[20px] italic  translate-x-[-10%]">
                  <TextupMotion isAnimate={isTextSectionEnd} text="AUTHENTIC" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PanelTemplate>
  );
}

export default ProfilePanel;

interface MotionTextProps {
  text: string;
  idx: number;
  onAnimationComplete: (bool: boolean) => void;
}

function MotionText(props: MotionTextProps) {
  const { text, onAnimationComplete, idx } = props;
  return (
    <motion.div
      layout
      transition={{ duration: 1.5, ease: customEase }}
      className="shadow-sm z-30 text-[120px] mo:text-[60px]"
      variants={textupVariant}
      custom={idx}
      // style={{ display: isimageEnd ? "none" : "inline-block" }}
      onAnimationComplete={
        idx === 6 ? () => onAnimationComplete(true) : () => {}
      }
    >
      <span className="z-[100]">{text}</span>
    </motion.div>
  );
}

interface CurtainProps {
  isPin: boolean;
  y: MotionValue<number>;
}

function Curtain(props: CurtainProps) {
  const { isPin, y } = props;
  console.log(y);
  return (
    <motion.div
      className="left-0 w-full h-screen-nav bg-default-black-bg z-20 flex"
      style={{
        position: "absolute",
        top: isPin ? y : "auto",
        bottom: isPin ? "auto" : 0,
      }}
    >
      <span className="text-[120px] mo:text-[60px] text-[#F50925] mt-auto ml-auto mb-md italic font-caslon">
        /ALBUM
      </span>
    </motion.div>
  );
}
