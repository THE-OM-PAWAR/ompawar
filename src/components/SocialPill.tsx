import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";

interface SocialPillProps {
  label: string;
  href: string;
}

const PIXEL = 3;
const COLS = 6;
const ROWS = 3;

const SocialPill = ({ label, href }: SocialPillProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);
  const pixelsRef = useRef<{ opacity: number; target: number; color: string }[]>([]);

  const blueShades = [
    "59,130,246",
    "96,165,250",
    "37,99,235",
    "147,197,253",
    "29,78,216",
  ];

  const initPixels = useCallback(() => {
    const total = COLS * ROWS * 2; // pixels for left + right edges
    pixelsRef.current = Array.from({ length: total }, () => ({
      opacity: 0,
      target: 0,
      color: blueShades[Math.floor(Math.random() * blueShades.length)],
    }));
  }, []);

  useEffect(() => {
    initPixels();
  }, [initPixels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      pixelsRef.current.forEach((p, i) => {
        // Set targets based on hover
        p.target = isHovered ? 0.4 + Math.random() * 0.5 : 0;
        // Lerp opacity
        p.opacity += (p.target - p.opacity) * 0.08;
        if (p.opacity < 0.01) p.opacity = 0;

        if (p.opacity > 0) {
          const isRight = i >= COLS * ROWS;
          const localIdx = isRight ? i - COLS * ROWS : i;
          const col = localIdx % COLS;
          const row = Math.floor(localIdx / COLS);

          let x: number;
          if (isRight) {
            x = w - (COLS - col) * PIXEL - 2;
          } else {
            x = col * PIXEL + 2;
          }
          const y = row * PIXEL + (h - ROWS * PIXEL) / 2;

          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = `rgb(${p.color})`;
          ctx.fillRect(Math.round(x), Math.round(y), PIXEL - 1, PIXEL - 1);
        }
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground overflow-hidden transition-colors duration-300 hover:border-blue-400/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.97 }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-400">
        {label}
      </span>
      <ExternalLink className="relative z-10 h-3.5 w-3.5 transition-colors duration-300 group-hover:text-blue-400" />
    </motion.a>
  );
};

export default SocialPill;
