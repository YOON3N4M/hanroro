import TextupMotion from "@/components/motion/TextupMotion";

interface IntroSectionProps {
  title: string;
  releaseDate: string;
}

function IntroSection(props: IntroSectionProps) {
  const { title, releaseDate } = props;

  return (
    <div className="py-[5rem] px-[5rem] flex-col flex items-center text-[5rem] tab:text-[3rem]">
      <div>
        <TextupMotion text={title.toUpperCase()} />
      </div>
      <div className="font-caslon italic">
        <TextupMotion className="px-md" text={`(${releaseDate.slice(0, 4)})`} />
      </div>
    </div>
  );
}

export default IntroSection;
