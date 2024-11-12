import { usePrevNextButtons } from "@/components/carousel/usePrevNextButton";
import { IconRightLeft, IconRightRight } from "@/components/svg";
import { SCHEDULE_LIST, Schedule } from "@/data/schedule";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface BannerCarouselProps {}

function BannerCarousel(props: BannerCarouselProps) {
  const {} = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });
  const { onNextButtonClick, onPrevButtonClick } = usePrevNextButtons(emblaApi);

  function isHide(idx) {
    if (!emblaApi) return;
  }

  return (
    <div className="size-full relative">
      {/* arrow */}
      <button
        onClick={onPrevButtonClick}
        className="absolute y-center left-[10%] z-[30] bg-default-gray-bg p-xs rounded-full"
      >
        <IconRightLeft />
      </button>
      <button
        onClick={onNextButtonClick}
        className="absolute y-center right-[10%] z-[30] bg-default-gray-bg p-xs rounded-full"
      >
        <IconRightRight />
      </button>
      <div ref={emblaRef} className="size-full overflow-hidden relative">
        {/* containe */}
        <div className="h-full flex min-w-full">
          {/* slide */}
          <Slide
            linkHref="/gallery"
            linkText="갤러리로 이동하기"
            desc="짤들을 업로드하고 공유해보세요."
          >
            <div className="relative size-full">
              <div className="absolute left-[7%] overflow-hidden bottom-[5%] w-[250px] h-[350px] rounded-[32px] shadow-md z-[1]">
                <Image
                  className="size-full object-cover brightness-0"
                  width={1000}
                  height={1000}
                  src="/images/content/hanroro.webp"
                />
              </div>
              <div className="absolute overflow-hidden left-[25%] top-[5%] w-[250px] h-[350px] rounded-[32px] shadow-md z-[2]">
                <Image
                  className="size-full object-cover brightness-0"
                  width={1000}
                  height={1000}
                  src="/images/content/roro-ping.webp"
                />
              </div>
              <div className="absolute overflow-hidden right-[25%] bottom-[10%] w-[250px] h-[350px] rounded-[32px] shadow-md z-[3]">
                <Image
                  className="size-full object-cover brightness-0"
                  width={1000}
                  height={1000}
                  src="/images/content/hyundai-card-dive-1.webp"
                />
              </div>
              <div className="absolute overflow-hidden right-[7%] top-[10%] w-[250px] h-[350px] rounded-[32px] shadow-md z-[4]">
                <Image
                  className="size-full object-cover brightness-0"
                  width={1000}
                  height={1000}
                  src="/images/content/sungshin-1.webp"
                />
              </div>
            </div>
          </Slide>
          <Slide
            linkHref="/schdule"
            linkText="일정 확인하기"
            desc="공연과 행사, 신규발매, 이벤트 등 모든 일정들을 확인해보세요."
          ></Slide>
          <Slide
            linkHref="/profile"
            linkText="알아보기"
            desc="앨범활동, 미디어 출연 정보를 확인해보세요."
          ></Slide>
        </div>
      </div>
    </div>
    //   ref
  );
}

export default BannerCarousel;

interface SlideProps {
  children?: ReactNode;
  linkHref: string;
  linkText: string;
  desc: string;
}

function Slide(props: SlideProps) {
  const { children, linkHref, linkText, desc } = props;
  return (
    <div className="basis-[60%] flex flex-col relative flex-shrink-0 ml-sm flex-grow-0 h-full border shadow-md">
      {/* button section */}
      <div className="absolute bottom-[5%] z-20 p-[56px] flex gap-sm items-center">
        <Link
          className="py-sm px-md bg-black text-white rounded-[980px]"
          href={linkHref}
        >
          {linkText}
        </Link>
        <p>{desc}</p>
      </div>
      {/* content section */}
      <div className="absolute size-full z-10 overflow-hidden">{children}</div>
    </div>
  );
}
