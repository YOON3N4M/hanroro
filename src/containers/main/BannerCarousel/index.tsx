import LoadingSpinner from "@/components/LoadingSpinner";
import { usePrevNextButtons } from "@/components/carousel/usePrevNextButton";
import { IconRightLeft, IconRightRight } from "@/components/svg";
import { cn } from "@/utils";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { home, howToGoOn, systemError } from "../../../../public/images/album";
interface BannerCarouselProps {}

function BannerCarousel(props: BannerCarouselProps) {
  const {} = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
    },
    [ClassNames({ snapped: "active-slide" })]
  );
  const { onNextButtonClick, onPrevButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="size-full">
      {!emblaApi && <LoadingSpinner />}
      <div
        className={cn(
          "size-full relative animate-fadeIn",
          !emblaApi && "hidden"
        )}
      >
        {/* arrow */}
        <button
          onClick={onPrevButtonClick}
          className="absolute y-center left-[10%] mo:left-[2%] mo:opacity-60 z-[30] bg-default-gray-bg p-xs rounded-full"
        >
          <IconRightLeft />
        </button>
        <button
          onClick={onNextButtonClick}
          className="absolute y-center right-[10%] mo:right-[2%] mo:opacity-60 z-[30] bg-default-gray-bg p-xs rounded-full"
        >
          <IconRightRight />
        </button>
        <div ref={emblaRef} className="size-full overflow-hidden relative">
          {/* containe */}
          <div className="h-full flex min-w-full">
            {/* slide */}
            <Slide
              linkHref="/profile"
              linkText="프로필로 이동"
              desc="프로필, 앨범 활동"
            >
              <div className="absolute center size-[300px]">
                <Image
                  src={systemError.src}
                  width={systemError.width}
                  height={systemError.height}
                  className="size-[300px] brightness-50 absolute z-[10] translate-x-[-150px] translate-y-[75px] mo:hidden"
                  alt="먹이사슬"
                />
                <Image
                  src={home.src}
                  width={home.width}
                  height={home.height}
                  className="size-[300px] brightness-50 absolute z-[13]"
                  alt="생존법"
                />
                <Image
                  src={howToGoOn.src}
                  width={howToGoOn.width}
                  height={howToGoOn.height}
                  className="size-[300px] brightness-50 absolute z-[12] translate-x-[150px] translate-y-[-75px] mo:hidden"
                  alt="집"
                />
              </div>
            </Slide>
            <Slide
              linkHref="/gallery"
              linkText="갤러리로 이동"
              desc="짤들을 업로드하고 공유"
            >
              <div className="relative size-full ">
                <Image
                  src={"/images/content/gallery-capture.png"}
                  width={3000}
                  height={3000}
                  alt="갤러리"
                  className="object-cover brightness-50 size-full opacity-80"
                />
              </div>
            </Slide>

            <Slide
              linkHref="/calendar"
              linkText="일정으로 이동"
              desc="공연과 행사, 앨범발매, 이벤트 등 모든 일정들"
            >
              <Image
                src={"/images/content/IMG_3469.JPG"}
                width={3000}
                height={3000}
                alt="현대카드 다이브"
                className="object-cover brightness-50 size-full object-[0%_23%]"
              />
            </Slide>
          </div>
        </div>
      </div>
    </div>
    //   ref
  );
}

export default BannerCarousel;

interface SlideProps {
  linkHref: string;
  linkText: string;
  desc: string;
  children?: ReactNode;
}

function Slide(props: SlideProps) {
  const { children, linkHref, linkText, desc } = props;
  return (
    <div
      className={cn(
        "basis-[60%] mo:basis-[80%] border flex bg-default-black-bg flex-col relative flex-shrink-0 ml-sm flex-grow-0 h-full shadow-md opacity-60 transition-opacity duration-1000"
      )}
    >
      {/* button section */}
      <div className="absolute bottom-[5%] z-20 w-full p-[56px] flex gap-sm items-center mo:flex-col-reverse mo:p-lg">
        <Link
          className="py-sm px-md text-black text-nowrap bg-white rounded-[980px] text-sm mo:py-xs mo:px-sm"
          href={linkHref}
        >
          {linkText}
        </Link>
        <p className="text-white text-sm mo:text-center">{desc}</p>
      </div>
      {/* content section */}
      <div className="absolute size-full z-10 overflow-hidden">{children}</div>
    </div>
  );
}
