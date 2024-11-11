import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { cn } from "@/utils";
import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";

interface ContentModuleProps {
  children?: ReactNode;
  href?: string;
  staticImage: StaticImageData;
  alt: string;
  imageHover?: boolean;
}

export default function ContentModule(props: ContentModuleProps) {
  const { children, href, staticImage, imageHover = true, alt } = props;

  return (
    <div className="size-full relative group text-white overflow-hidden">
      {/* full size link wrapper */}
      {href && (
        <NewTabAnchor
          className="size-full z-[3] absolute top-0 left-0"
          href={href}
        >
          &nbsp;
        </NewTabAnchor>
      )}

      {/* text wrapper */}
      <div className="size-full flex flex-col absolute top-0 left-0 z-[2] p-md">
        {children}
      </div>
      {/* image wrapper */}
      <div className="size-full absolute top-0 left-0 z-[1]">
        <Image
          src={staticImage.src}
          width={staticImage.width}
          height={staticImage.height}
          className={cn(
            "size-full object-cover transition-all animate-fadeIn",
            imageHover
              ? "group-hover:brightness-100 brightness-50 group-hover:scale-105"
              : "brightness-[0.25]"
          )}
          alt={alt}
        />
      </div>
    </div>
  );
}
