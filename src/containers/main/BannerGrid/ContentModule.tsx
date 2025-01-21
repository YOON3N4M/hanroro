import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { cn } from "@/utils";
import Image, { StaticImageData } from "next/image";
import { Link } from "next-view-transitions";
import React, { ReactNode } from "react";
import { BannerGridContent } from "./_local";

interface ContentModuleProps {
  content: BannerGridContent;
}

export default function ContentModule(props: ContentModuleProps) {
  const { content } = props;

  const { href, linkHref, title, subTitle, date, src } = content;
  const localSrc = require(`./_local/asset/${src}`).default;
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
      {linkHref && (
        <Link href={linkHref} className="size-full z-[3] absolute top-0 left-0">
          &nbsp;
        </Link>
      )}

      {/* text wrapper */}
      <div className="size-full flex flex-col absolute top-0 left-0 z-[2] p-md">
        <div className="mt-auto pb-[60px] flex flex-col items-center font-[100]">
          <h3 className="text-3xl">{title}</h3>
          {subTitle && <p>{subTitle}</p>}

          {date && <p>{date}</p>}
        </div>
      </div>
      {/* image wrapper */}
      <div className="size-full absolute top-0 left-0 z-[1]">
        <Image
          src={localSrc}
          width={9999}
          height={9999}
          className={cn(
            "size-full object-cover transition-all animate-fadeIn",
            true
              ? "group-hover:brightness-100 brightness-50"
              : "brightness-[0.25]"
          )}
          alt={title}
        />
      </div>
    </div>
  );
}
