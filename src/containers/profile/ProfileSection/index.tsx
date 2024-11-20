import { useInView, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { Tab } from "..";

interface ProfileSectionProps {
  index: number;
  tab: Tab;
  indexSetter: React.Dispatch<React.SetStateAction<number>>;
}

function ProfileSection(props: ProfileSectionProps) {
  const { index, tab, indexSetter } = props;

  const ref = useRef(null);

  const isInView = useInView(ref, { amount: 0.55 });

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
      className="h-screen-nav relative bg-default-black-bg"
    >
      {/* <span className="center absolute">{index}</span> */}
    </div>
  );
}

export default ProfileSection;
