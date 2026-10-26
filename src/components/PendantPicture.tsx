import type { CSSProperties } from "react";
import type { PendantImage } from "@/lib/pendant-images";

type Props = {
  image: PendantImage;
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

/** Responsive WebP picture with a JPEG fallback, explicit dimensions and lazy loading below the fold. */
export function PendantPicture({ image, alt, sizes, className, style, priority = false }: Props) {
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={image.webp.map((s) => `${s.url} ${s.w}w`).join(", ")} sizes={sizes} />
      <img
        src={image.fallback}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
}
