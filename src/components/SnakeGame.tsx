import { useEffect, useRef, useCallback, useState } from "react";

const PIXEL_SIZE = 8;
const DOT_SIZE = 10;
const SNAKE_SPEED = 3;
const MAX_DOTS = 5;
const INITIAL_SNAKE_LENGTH = 5;

const BLUE_PALETTE = [
  "rgba(59, 130, 246, 0.9)",
  "rgba(96, 165, 250, 0.8)",
  "rgba(37, 99, 235, 0.85)",
  "rgba(147, 197, 253, 0.7)",
  "rgba(29, 78, 216, 0.8)",
];

interface Dot {
  x: number;
  y: number;
  pulse: number;
}

interface SnakeSegment {
  x: number;
  y: number;
}

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const snakeRef = useRef<SnakeSegment[]>([]);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const headRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const boundsRef = useRef({ width: 0, height: 0 });
  const [score, setScore] = useState(0);
  const isActiveRef = useRef(false);
  const maxLengthRef = useRef(INITIAL_SNAKE_LENGTH);

  const spawnDot = useCallback(() => {
    const { width, height } = boundsRef.current;
    if (width === 0 || height === 0) return;
    const dot: Dot = {
      x: 20 + Math.random() * (width - 40),
      y: 20 + Math.random() * (height - 40),
      pulse: Math.random() * Math.PI * 2,
    };
    dotsRef.current.push(dot);
  }, []);

  const initSnake = useCallback(() => {
    const { width, height } = boundsRef.current;
    const cx = width / 2;
    const cy = height / 2;
    headRef.current = { x: cx, y: cy };
    mouseRef.current = { x: cx, y: cy };
    snakeRef.current = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snakeRef.current.push({ x: cx, y: cy });
    }
    maxLengthRef.current = INITIAL_SNAKE_LENGTH;
    scoreRef.current = 0;
    setScore(0);
    dotsRef.current = [];
    for (let i = 0; i < MAX_DOTS; i++) {
      spawnDot();
    }
  }, [spawnDot]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = boundsRef.current;
    ctx.clearRect(0, 0, width, height);

    // Move head toward mouse
    const head = headRef.current;
    const dx = mouseRef.current.x - head.x;
    const dy = mouseRef.current.y - head.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      const speed = Math.min(SNAKE_SPEED, dist);
      head.x += (dx / dist) * speed;
      head.y += (dy / dist) * speed;
    }

    // Add head position to snake
    snakeRef.current.unshift({ x: head.x, y: head.y });
    while (snakeRef.current.length > maxLengthRef.current) {
      snakeRef.current.pop();
    }

    // Check dot collisions
    const now = Date.now();
    dotsRef.current = dotsRef.current.filter((dot) => {
      const ddx = head.x - dot.x;
      const ddy = head.y - dot.y;
      if (Math.sqrt(ddx * ddx + ddy * ddy) < DOT_SIZE + PIXEL_SIZE) {
        maxLengthRef.current += 8;
        scoreRef.current++;
        setScore(scoreRef.current);
        // Spawn a new dot
        setTimeout(() => {
          if (dotsRef.current.length < MAX_DOTS) spawnDot();
        }, 300);
        return false;
      }
      return true;
    });

    // Ensure dots exist
    while (dotsRef.current.length < MAX_DOTS) {
      spawnDot();
    }

    // Draw dots with pulse
    dotsRef.current.forEach((dot) => {
      dot.pulse += 0.05;
      const pulseScale = 1 + Math.sin(dot.pulse) * 0.3;
      const size = DOT_SIZE * pulseScale;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size / 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
      ctx.fill();
    });

    // Draw snake (pixelated)
    const snake = snakeRef.current;
    for (let i = snake.length - 1; i >= 0; i--) {
      const seg = snake[i];
      const progress = i / snake.length;
      const alpha = 0.3 + progress * 0.7;
      const size = PIXEL_SIZE * (0.5 + progress * 0.5);

      const colorIdx = Math.floor(progress * (BLUE_PALETTE.length - 1));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = BLUE_PALETTE[colorIdx];

      const px = Math.round(seg.x / PIXEL_SIZE) * PIXEL_SIZE;
      const py = Math.round(seg.y / PIXEL_SIZE) * PIXEL_SIZE;
      ctx.fillRect(px - size / 2, py - size / 2, size, size);
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(animate);
  }, [spawnDot]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      boundsRef.current = { width: rect.width, height: rect.height };
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        initSnake();
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      }
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, initSnake]);

  return (
    <div ref={containerRef} className="relative w-full h-32 sm:h-40 mt-6 rounded-lg border border-border/50 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="absolute top-2 left-3 text-[10px] text-muted-foreground/60 font-mono select-none pointer-events-none">
        snake · score: {score}
      </div>
      <div className="absolute top-2 right-3 text-[10px] text-muted-foreground/40 font-mono select-none pointer-events-none">
        move cursor to play
      </div>
    </div>
  );
};

export default SnakeGame;
