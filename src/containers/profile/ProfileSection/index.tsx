import { useInView, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { Tab } from "..";
import { cn } from "@/utils";

interface ProfileSectionProps {
  index: number;
  tab: Tab;
  indexSetter: React.Dispatch<React.SetStateAction<number>>;
}

const sectionHeightStyles: Record<string, string> = {
  "1": "h-screen-nav",
  "2": "h-screen-nav-double",
};

function ProfileSection(props: ProfileSectionProps) {
  const { index, tab, indexSetter } = props;
  const { vh = 1 } = tab;

  const ref = useRef(null);

  const isInView = useInView(ref, { amount: vh === 1 ? 0.55 : 0.3 });

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["end start", "start start"],
  });

  useEffect(() => {
    if (isInView) {
      if (!scrollYProgress) return;

      indexSetter(index);
    }
  }, [isInView]);
  return (
    <div
      id={tab.eng}
      ref={ref}
      className={cn(
        "relative bg-default-black-bg",
        sectionHeightStyles[vh.toString()]
      )}
    >
      {/* <span className="center absolute">{index}</span> */}
    </div>
  );
}

export default ProfileSection;
