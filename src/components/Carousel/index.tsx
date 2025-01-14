import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  emblaRef: EmblaViewportRefType;
}

export function Carousel(props: CarouselProps) {
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
