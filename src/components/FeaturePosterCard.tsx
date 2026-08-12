import React from "react";

interface FeaturePosterCardProps {
  imageSrc?: string;
  videoSrc?: string;
  headline?: string;
  linkText?: string;
  href?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export const FeaturePosterCard: React.FC<FeaturePosterCardProps> = ({
  imageSrc,
  videoSrc,
  headline = "Therapy, support, and tools built for everyday life.",
  linkText = "stillermind.ai",
  href,
  className = "",
  description,
  children,
}) => {
  return (
    <div className={`w-full bg-background text-foreground flex flex-col ${className}`}>
      {/* Media Section */}
      <div className="relative w-full overflow-hidden rounded-md border border-border/40">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain"
          />
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={headline}
            className="w-full h-auto object-contain"
          />
        ) : null}
      </div>

      {/* Bottom Editorial Content Section */}
      <div className="pt-3 pb-1 flex flex-col gap-2">
        {headline && (
          <p className="text-xs font-serif font-medium text-foreground leading-snug tracking-tight">
            {headline}
          </p>
        )}

        {description && (
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        {children}

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
};

export default FeaturePosterCard;
