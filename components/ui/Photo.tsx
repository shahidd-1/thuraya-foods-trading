import { unsplashUrl, type StockImage } from '@/lib/images';

type PhotoProps = {
  image: StockImage;
  /** Standard `sizes` attribute so the browser picks the right width. */
  sizes: string;
  className?: string;
  priority?: boolean;
  widths?: number[];
};

export function Photo({
  image,
  sizes,
  className,
  priority = false,
  widths = [480, 800, 1200, 1800],
}: PhotoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={unsplashUrl(image.id, widths[1] ?? widths[0])}
      srcSet={widths.map((w) => `${unsplashUrl(image.id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={image.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
