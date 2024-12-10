import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";

interface ImageSectionProps {
  src: string | string[];
  imageClassName?: string;
  justfy?: "justify-start" | "justify-center" | "justify-end";
}

function ImageSection(props: ImageSectionProps) {
  const { src, imageClassName, justfy = "justify-center" } = props;

  if (typeof src === "string")
    return (
      <Container className={justfy}>
        <div className="flex-1 flex justify-center">
          <Image
            width={3000}
            height={3000}
            src={src}
            className={cn("object-cover size-full", imageClassName)}
            alt=""
            priority={false}
          />
        </div>
      </Container>
    );

  return (
    <Container className="gap-lg">
      {src.map((s) => (
        <div key={s} className="flex-1 flex justify-center">
          <Image
            width={3000}
            height={3000}
            src={s}
            priority={false}
            className={cn("object-cover size-full", imageClassName)}
            alt=""
          />
        </div>
      ))}
    </Container>
  );
}

export default ImageSection;

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Container(props: ContainerProps) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "inner justify-center flex mb-[20rem] tab:flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}
