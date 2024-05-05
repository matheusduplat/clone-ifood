import Image, { ImageProps } from "next/image";

export function PromoBanner(props: ImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      className="h-auto w-full object-contain"
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      {...props}
    />
  );
}
