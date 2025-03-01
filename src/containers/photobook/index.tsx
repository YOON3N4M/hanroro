"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { PHOTOBOOK_LIST, Photobook, srcGenerate } from "./_local";

interface PhotobookContainerProps {}

function PhotobookContainer(props: PhotobookContainerProps) {
  const {} = props;

  const [keyword, setKeyword] = useState("");

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const filteredPhotobookList =
    keyword === ""
      ? PHOTOBOOK_LIST
      : PHOTOBOOK_LIST.filter((photobook) => photobook.title.includes(keyword));

  return (
    <div className="y-inner min-h-screen inner">
      <div className="flex justify-between mt-[20px] tab:flex-col">
        <input
          className="input !bg-[#282828] px-xxs text-sm"
          placeholder="키워드 검색"
          onChange={handleOnChange}
        />
        <div className="text-xs opacity-70 text-right tab:mt-lg">
          <p>아래의 이메일로 사진을 제보해주시면 등록 됩니다.</p>
          <span>hanrorocket@gmail.com</span>
        </div>
      </div>

      <div className="grid grid-cols-4 tab:grid-cols-2 gap-md mt-xl">
        {filteredPhotobookList.map((item) => (
          <PhotobookItem key={item.titleEng} photobook={item} />
        ))}
      </div>
    </div>
  );
}

export default PhotobookContainer;

interface PhotobookItemProps {
  photobook: Photobook;
}

function PhotobookItem(props: PhotobookItemProps) {
  const { photobook } = props;
  const { title, titleEng, imageList } = photobook;

  const thumbnailSrc = srcGenerate(titleEng, imageList[0].imageFileName);

  return (
    <div className="group flex flex-col relative">
      {/* link */}
      <Link
        href={`/photobook/${titleEng}`}
        className="size-full absolute top-0 left-0 z-[100]"
      >
        &nbsp;
      </Link>
      {/* bg */}
      <div className="aspect-square flex-1 relative">
        <div className="absolute top-0 left-0 size-full">
          <Image
            src={thumbnailSrc}
            className="object-cover brightness-100 group-hover:brightness-50 transition-all"
            fill
            alt={`한로로 ${title} 포토앨범`}
          />
        </div>
      </div>
      {/* text */}
      {/* <div className="absolute bottom-xl x-center">
        <span>{title}</span>
      </div> */}
      <div className="text-sm mt-sm flex tab:min-h-[40px] line-clamp-2">
        {/* <span className="font-bold text-blue-300">공연</span> */}
        <span>{title}</span>
      </div>
    </div>
  );
}
