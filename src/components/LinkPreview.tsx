import { useState, useRef } from "react";

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const LinkPreview = ({ href, children, className, target = "_blank", rel = "noopener noreferrer" }: LinkPreviewProps) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const isExternal = href.startsWith("http");
  const isPreviewable = isExternal && !href.startsWith("mailto:") && !href.startsWith("tel:");

  const handleMouseEnter = () => {
    if (!isPreviewable) return;
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      setPosition(rect.top > 280 ? "above" : "below");
    }
    timeoutRef.current = setTimeout(() => setShow(true), 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  };

  return (
    <span className="relative inline-block">
      <a
        ref={linkRef}
        href={href}
        target={target}
        rel={rel}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
      {show && isPreviewable && (
        <div
          className={`absolute z-50 left-1/2 -translate-x-1/2 ${
            position === "above" ? "bottom-full mb-3" : "top-full mt-3"
          }`}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-[280px] h-[180px] rounded-lg border border-border bg-card shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <iframe
              src={href}
              title={`Preview of ${href}`}
              className="w-[1120px] h-[720px] origin-top-left pointer-events-none"
              style={{ transform: "scale(0.25)" }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          </div>
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-border bg-card ${
              position === "above"
                ? "bottom-[-7px] border-t-0 border-l-0"
                : "top-[-7px] border-b-0 border-r-0"
            }`}
          />
        </div>
      )}
    </span>
  );
};

export default LinkPreview;
