import { IconCarousel, IconGrid } from "@/components/svg";
import GalleyUploadButton from "../Upload";
import { cn } from "@/utils";
import {
  GalleryViewType,
  ImageType,
  useGalleryActions,
  useGalleryViewType,
  useImageType,
  useSelectedTagList,
  useUniqueTagList,
} from "../state";

interface FilterSectionProps {}

function FilterSection(props: FilterSectionProps) {
  const {} = props;

  const uniqueTagList = useUniqueTagList();

  return (
    <div className="basis-[20%] min-w-[300px] max-w-[375px] border py-md mo:w-full mo:max-w-full h-min">
      <div className="flex justify-center">
        <GalleyUploadButton className="text-white rounded-md bg-default-gray-bg py-xs px-sm w-[180px] border" />
      </div>
      <div className="px-md mt-md text-sm">
        <span className="opacity-60">유형</span>
        <div className="flex gap-sm mt-xxs text-sm">
          <ViewTypeButton viewType="gallery" />
          <ViewTypeButton viewType="carousel" />
        </div>
      </div>
      <div className="px-md mt-md text-sm">
        <span className="opacity-60">필터</span>
        <div className="flex gap-sm mt-xxs text-sm">
          <ImageTypeButton type="image" />
          <ImageTypeButton type="gif" />
        </div>
      </div>
      <div className="px-md mt-md text-sm">
        <span className="opacity-60">태그</span>
        <div className="flex gap-sm mt-xxs flex-wrap text-sm mo:max-h-[80px] mo:overflow-y-auto">
          {uniqueTagList.map((item, idx) => (
            <TagButton key={`tag-${item}`} tag={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterSection;

function ViewTypeButton({ viewType }: { viewType: GalleryViewType }) {
  const galleryViewType = useGalleryViewType();
  const { setViewType } = useGalleryActions();

  function onClick() {
    setViewType(viewType);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-col button items-center gap-xs transition-all",
        galleryViewType === viewType ? "brightness-100" : "brightness-50"
      )}
    >
      {viewType === "gallery" ? (
        <>
          <span>갤러리</span>
          <IconGrid className="text-xl" />
        </>
      ) : (
        <>
          <span>캐러셀</span>
          <IconCarousel className="text-xl" />
        </>
      )}
    </button>
  );
}

function ImageTypeButton({ type }: { type: ImageType }) {
  const imageType = useImageType();
  const { setImageType } = useGalleryActions();
  function onclick() {
    setImageType(type === imageType ? null : type);
  }
  return (
    <button
      className={cn(
        "text-white rounded-md bg-default-gray-bg px-sm flex items-center gap-xxs",
        imageType === type ? "brightness-100" : "brightness-50"
      )}
      onClick={onclick}
      aria-label={`filter ${type} button`}
    >
      {type === "image" ? "사진만" : "움짤만"}
    </button>
  );
}

function TagButton({ tag }: { tag: string }) {
  const seletedTagList = useSelectedTagList();
  const { setSelectedTagList } = useGalleryActions();

  function onClick() {
    setSelectedTagList(tag);
  }
  return (
    <button
      className={cn(
        "rounded-md text-[#e4e4e7] border px-xs",
        seletedTagList.includes(tag) ? "brightness-100" : "brightness-50"
      )}
      onClick={onClick}
      aria-label={`filter ${tag} filter`}
    >
      #{tag}
    </button>
  );
}
