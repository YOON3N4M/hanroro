import { useEffect, useState } from "react";
import TextupMotion from "./TextupMotion";

interface RotationTextUpMotionProps {
  textList: string[];
}

function RotationTextUpMotion(props: RotationTextUpMotionProps) {
  const { textList } = props;
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimateComplete, setIsAnimateComplete] = useState(false);

  useEffect(() => {
    if (!isAnimateComplete) return;
    setTimeout(() => {
      setTextIndex((prev) => {
        let newIndex = prev + 1;
        if (prev === textList.length - 1) {
          newIndex = 0;
        }
        setIsAnimateComplete(false);
        return newIndex;
      });
    }, 1000);
  }, [isAnimateComplete]);

  return (
    <div>
      <TextupMotion
        text={textList[textIndex]}
        onAnimateComplete={setIsAnimateComplete}
        isExit={true}
      />
    </div>
  );
}

export default RotationTextUpMotion;
