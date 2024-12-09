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
        <Image
          width={3000}
          height={3000}
          src={src}
          className={cn("object-cover", imageClassName || "h-[720px]")}
          alt=""
        />
      </Container>
    );

  return (
    <Container className="gap-lg">
      {src.map((s) => (
        <Image
          key={s}
          width={3000}
          height={3000}
          src={s}
          className={cn("object-cover flex-1", imageClassName || "h-auto")}
          alt=""
        />
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
    <div className={cn("px-[5rem] flex mb-[20rem] w-full", className)}>
      {children}
    </div>
  );
}
