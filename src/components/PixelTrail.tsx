import { useEffect, useRef, useCallback } from "react";

const PIXEL_SIZE = 6;
const TRAIL_LENGTH = 35;
const SPAWN_INTERVAL = 16;
const FADE_DELAY = 100; // ms after cursor stops before fading begins

const BLUE_PALETTE = [
  "rgba(59, 130, 246, 0.9)",
  "rgba(96, 165, 250, 0.8)",
  "rgba(37, 99, 235, 0.85)",
  "rgba(147, 197, 253, 0.7)",
  "rgba(29, 78, 216, 0.8)",
  "rgba(191, 219, 254, 0.6)",
  "rgba(59, 130, 246, 0.5)",
];

interface Pixel {
  x: number;
  y: number;
  color: string;
  life: number;
  maxLife: number;
  offsetX: number;
  offsetY: number;
}

const PixelTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isMovingRef = useRef(false);
  const moveTimeoutRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();

    // Only spawn new pixels when cursor is moving
    if (isMovingRef.current && now - lastSpawnRef.current > SPAWN_INTERVAL) {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const life = 20 + Math.floor(Math.random() * 25);
        pixelsRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          color: BLUE_PALETTE[Math.floor(Math.random() * BLUE_PALETTE.length)],
          life,
          maxLife: life,
          offsetX: (Math.random() - 0.5) * 18,
          offsetY: (Math.random() - 0.5) * 18,
        });
      }
      if (pixelsRef.current.length > TRAIL_LENGTH) {
        pixelsRef.current = pixelsRef.current.slice(-TRAIL_LENGTH);
      }
      lastSpawnRef.current = now;
    }

    pixelsRef.current = pixelsRef.current.filter((p) => {
      p.life--;
      if (p.life <= 0) return false;

      const progress = 1 - p.life / p.maxLife;
      const alpha = 1 - progress;
      const size = PIXEL_SIZE * (1 - progress * 0.5);

      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(
        Math.round((p.x + p.offsetX * progress) / PIXEL_SIZE) * PIXEL_SIZE,
        Math.round((p.y + p.offsetY * progress) / PIXEL_SIZE) * PIXEL_SIZE,
        size,
        size
      );
      return true;
    });

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isMovingRef.current = true;
      clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = window.setTimeout(() => {
        isMovingRef.current = false;
      }, FADE_DELAY);
    };
    window.addEventListener("mousemove", onMove);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(moveTimeoutRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default PixelTrail;
