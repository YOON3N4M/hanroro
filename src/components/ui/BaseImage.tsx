import Image, { ImageProps } from "next/image";

interface BaseImageProps extends ImageProps {}

function BaseImage(props: BaseImageProps) {
  const { src, alt, width = 3000, height = 3000, className, ...attrs } = props;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...attrs}
    >
      BaseImage
    </Image>
  );
}

export default BaseImage;
