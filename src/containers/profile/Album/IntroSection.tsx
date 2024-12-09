import TextupMotion from "@/components/motion/TextupMotion";

interface IntroSectionProps {
  workTitle: string;
  workYear: string;
}

function IntroSection(props: IntroSectionProps) {
  const { workTitle, workYear } = props;

  return (
    <div className="py-[5rem] px-[5rem] flex-col flex items-center">
      <div className="text-[5rem]">
        <TextupMotion text={workTitle.toUpperCase()} />
      </div>
      <div className="text-[5rem] font-caslon italic">
        <TextupMotion text={`(${workYear})`} />
      </div>
    </div>
  );
}

export default IntroSection;
