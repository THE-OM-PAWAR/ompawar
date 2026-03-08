import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const PIXEL_SIZE = 24;
const TRANSITION_DURATION = 600; // ms

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [transitioning, setTransitioning] = useState(false);
  const [overlayTheme, setOverlayTheme] = useState<"light" | "dark">("light");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const runPixelTransition = useCallback((nextTheme: "light" | "dark") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const cols = Math.ceil(w / PIXEL_SIZE);
    const rows = Math.ceil(h / PIXEL_SIZE);
    const total = cols * rows;

    // Create shuffled indices
    const indices = Array.from({ length: total }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const color = nextTheme === "dark" ? "hsl(0 0% 7%)" : "hsl(0 0% 96%)";
    const startTime = performance.now();
    let themeSwitched = false;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const pixelsToShow = Math.floor(eased * total);

      ctx.fillStyle = color;
      for (let i = 0; i < pixelsToShow; i++) {
        const idx = indices[i];
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }

      // Switch theme at ~60% fill
      if (!themeSwitched && progress > 0.6) {
        themeSwitched = true;
        setTheme(nextTheme);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Hold briefly then fade out by clearing
        setTimeout(() => {
          // Reverse: remove pixels
          const clearStart = performance.now();
          const clearIndices = [...indices].reverse();

          const clearAnimate = (now2: number) => {
            const elapsed2 = now2 - clearStart;
            const prog2 = Math.min(elapsed2 / (TRANSITION_DURATION * 0.6), 1);
            const eased2 = 1 - Math.pow(1 - prog2, 3);
            const pixelsToClear = Math.floor(eased2 * total);

            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = color;

            // Draw remaining pixels
            const remaining = total - pixelsToClear;
            for (let i = 0; i < remaining; i++) {
              const idx = clearIndices[total - 1 - i];
              const col = idx % cols;
              const row = Math.floor(idx / cols);
              ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
            }

            if (prog2 < 1) {
              rafRef.current = requestAnimationFrame(clearAnimate);
            } else {
              ctx.clearRect(0, 0, w, h);
              setTransitioning(false);
            }
          };
          rafRef.current = requestAnimationFrame(clearAnimate);
        }, 100);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const toggleTheme = useCallback(() => {
    if (transitioning) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setOverlayTheme(nextTheme);
    setTransitioning(true);
    runPixelTransition(nextTheme);
  }, [theme, transitioning, runPixelTransition]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />

      <motion.button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
          >
            {theme === "light" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ThemeToggle;
