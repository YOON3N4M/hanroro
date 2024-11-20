import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { ReactNode } from "react";

interface BasicCarouselProps {
  children: ReactNode;
  emblaRef: EmblaViewportRefType;
}

export function BasicCarousel(props: BasicCarouselProps) {
  const { children, emblaRef } = props;

  return (
    //   container
    <div ref={emblaRef} className="overflow-hidden ">
      {/* wrapper */}
      <div className="flex">
        {/* slides */}
        {children}
      </div>
    </div>
  );
}
