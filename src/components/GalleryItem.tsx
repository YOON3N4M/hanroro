import { cn } from "@/utils";
import { HTMLAttributes } from "react";

interface GalleryItemProps extends HTMLAttributes<HTMLDivElement> {}

function GalleryItem(props: GalleryItemProps) {
  const { className, ...attrs } = props;

  return <div className={cn(className, "bg-black")} {...attrs}></div>;
}

export default GalleryItem;
