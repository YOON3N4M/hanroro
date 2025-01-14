import { cn } from "@/utils";
import { HTMLAttributes } from "react";

interface SkeletonImageProps extends HTMLAttributes<HTMLDivElement> {}

function SkeletonImage(props: SkeletonImageProps) {
  const { className } = props;

  return <div className={cn(className, "animate-pulse")}></div>;
}

export default SkeletonImage;
