import { motion } from "motion/react";

interface TextupMotionProps {
  isAnimate?: boolean;
  text: string;
}

export const customEase = [0.075, 0.82, 0.165, 1];

const containerVariant = {
  hidden: {
    opacity: 1,
  },
  visible: {
    transition: {
      transition: { delayChildren: 2 },
    },
  },
};

export const textupVariant = {
  hidden: {
    y: "100%",
  },
  visible: (custom: number) => ({
    y: "0%",
    transition: {
      duration: 1.5,
      delay: custom * 0.075,
      ease: customEase,
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
  const { isAnimate, text } = props;

  const splitText = text.split("");

  // console.log(splitText, isAnimate);

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate={isAnimate ? "visible" : "hidden"}
      className="flex h-min overflow-hidden italic px-md"
    >
      {splitText.map((t, idx) => (
        <motion.div
          custom={idx}
          variants={textupVariant}
          key={idx}
          className="inline-block"
        >
          <span>{t}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TextupMotion;
