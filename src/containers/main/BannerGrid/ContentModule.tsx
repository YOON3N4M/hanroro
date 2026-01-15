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

  const {
    href,
    linkHref,
    title,
    subTitle,
    date,
    src,
    objectFit = "cover",
  } = content;
  const localSrc = require(`./_local/asset/${src}`).default as StaticImageData;
  const isContain = objectFit === "contain";
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
      <div className="size-full absolute top-0 left-0 z-[1] bg-default-black-bg">
        {/* contain일 때: 뒤에 같은 이미지를 cover+blur로 깔아서 양옆이 분리돼 보이지 않게 처리 */}
        {isContain && (
          <>
            <Image
              src={localSrc}
              fill
              sizes="(max-width: 734px) 100vw, 50vw"
              className="size-full object-cover scale-110 blur-2xl brightness-[0.35] saturate-125"
              alt=""
              aria-hidden="true"
            />
            {/* 좌/우 블랙 그라데이션(배경용) */}
            <div className="pointer-events-none absolute inset-0 z-[2]">
              <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#09090B] via-[#09090B80] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-[#09090B] via-[#09090B80] to-transparent" />
            </div>
          </>
        )}

        {/* 실제 표시 이미지(전경) */}
        <Image
          src={localSrc}
          fill
          sizes="(max-width: 734px) 100vw, 50vw"
          className={cn(
            "size-full transition-all animate-fadeIn z-[3]",
            true
              ? "group-hover:brightness-100 brightness-50"
              : "brightness-[0.25]",
            isContain ? "object-contain" : "object-cover"
          )}
          alt={title}
        />
      </div>
    </div>
  );
}
