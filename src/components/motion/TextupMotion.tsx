import { cn } from "@/utils";
import { motion } from "motion/react";
import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface TextupMotionProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  isAnimate?: boolean;
  onAnimateComplete?: Dispatch<SetStateAction<boolean>>;
  isExit?: boolean;
}

export const customEase = [0.075, 0.82, 0.165, 1];

const containerVariant = {
  hidden: {
    opacity: 1,
  },
  visible: {
    transition: {
      transition: { delayChildren: 0 },
    },
  },
};

type TextUpVariantCustom = {
  idx: number;
  isVisibleEnd: boolean;
};

export const textupVariant = {
  hidden: (custom: TextUpVariantCustom) => ({
    y: custom.isVisibleEnd ? "0%" : "100%",
  }),
  visible: (custom: TextUpVariantCustom) => ({
    y: "0%",
    transition: {
      duration: 1.5,
      delay: custom.idx * 0.075,
      ease: customEase,
    },
  }),
  exit: (custom: TextUpVariantCustom) => ({
    y: "-100%",
    transition: {
      duration: 1.5,
      delay: custom.idx * 0.075,
      ease: [0.82, 0.075, 1, 0.165],
    },
  }),

  //   eixt: (custom: number) => ({
  //     y: "100%",
  //     transition: {
  //       duration: 1.5,
  //       delay: custom * 0.075,
  //       ease: customEase,
  //     },
  //   }),
};

function TextupMotion(props: TextupMotionProps) {
  const {
    isAnimate = true,
    text,
    className,
    onAnimateComplete,
    isExit = false,
  } = props;

  const [isVisibleEnd, setIsVisibleEnd] = useState(false);
  const splitText = text.split("");

  useEffect(() => {
    setIsVisibleEnd(false);
  }, [text]);

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate={isAnimate ? (isVisibleEnd ? "exit" : "visible") : "hidden"}
      className={cn("flex h-min overflow-hidden", className)}
      key={`${text}-${isVisibleEnd}`}
    >
      {splitText.map((t, idx) => (
        <motion.div
          custom={{ idx, isVisibleEnd }}
          variants={textupVariant}
          key={idx}
          className="inline-block"
          onAnimationComplete={() => {
            if (idx === splitText.length - 1) {
              if (isVisibleEnd) {
                onAnimateComplete && onAnimateComplete(true);
              } else {
                if (isExit) {
                  setTimeout(() => {
                    setIsVisibleEnd(true);
                  }, 1000);
                }
              }
              // onAnimateComplete && onAnimateComplete(true);
            }
          }}
        >
          <span>{t}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TextupMotion;
