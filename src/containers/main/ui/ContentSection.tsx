import { cn } from "@/utils";
import React from "react";

interface ContentSectionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

export default function ContentSection(props: ContentSectionProps) {
  const { children, className } = props;
  return (
    <div className={cn("min-h-[580px] h-[580px]", className)}>
      {children}
      {/* <div className='absolute z-[1] top-0 left-0 size-full'>
            image container
      </div> */}
    </div>
  );
}
