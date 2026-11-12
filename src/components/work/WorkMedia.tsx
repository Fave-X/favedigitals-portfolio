import type { WorkMedia as Media } from "@/lib/types";

type Props = {
  media: Media;
  /** Controls on case-study pages; muted loop previews elsewhere. */
  controls?: boolean;
  className?: string;
};

/** Screen recording with its screenshot as poster. Lazy: only metadata loads up front. */
export function WorkMedia({ media, controls = false, className }: Props) {
  return (
    <video
      className={`block h-auto w-full bg-surface ${className ?? ""}`}
      width={media.width}
      height={media.height}
      poster={media.poster}
      preload="none"
      muted
      playsInline
      loop={!controls}
      autoPlay={!controls}
      controls={controls}
      aria-label={media.alt}
    >
      <source src={media.src} type="video/mp4" />
    </video>
  );
}
