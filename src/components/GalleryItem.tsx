import { GalleryItemDoc } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface GalleryItemProps extends HTMLAttributes<HTMLDivElement> {
  doc: GalleryItemDoc;
}

function GalleryItem(props: GalleryItemProps) {
  const { doc, className, ...attrs } = props;

  if (!doc) return;

  return (
    <div className={cn(className, "bg-black")} {...attrs}>
      <Image width={1000} height={1000} src={doc.url} className="max-w-[183px]" />
    </div>
  );
}

export default GalleryItem;
