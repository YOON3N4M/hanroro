import Link from "next/link";
import { PHOTOBOOK_LIST, Photobook, srcGenerate } from "./_local";
import Image from "next/image";

interface PhotobookContainerProps {}

function PhotobookContainer(props: PhotobookContainerProps) {
  const {} = props;

  return (
    <div className="y-inner min-h-screen inner">
      <div className="grid grid-cols-4 tab:grid-cols-1 gap-md">
        {PHOTOBOOK_LIST.map((item) => (
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
            alt={`한로로 ${title} 포토북`}
          />
        </div>
      </div>
      {/* text */}
      {/* <div className="absolute bottom-xl x-center">
        <span>{title}</span>
      </div> */}
      <div className="text-sm mt-sm flex">
        {/* <span className="font-bold text-blue-300">공연</span> */}
        <span>{title}</span>
      </div>
    </div>
  );
}
