import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const PIXEL_SIZE = 12;
const COVER_DURATION = 400; // ms to cover screen with new theme pixels
const REVEAL_DURATION = 550; // ms to dissolve pixels revealing text & components

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [transitioning, setTransitioning] = useState(false);
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

    // Create shuffled indices for cover phase
    const coverIndices = Array.from({ length: total }, (_, i) => i);
    for (let i = coverIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coverIndices[i], coverIndices[j]] = [coverIndices[j], coverIndices[i]];
    }

    const nextColor = nextTheme === "dark" ? "hsl(0 0% 7%)" : "hsl(0 0% 96%)";
    const startCoverTime = performance.now();

    // Phase 1: Pixels build up covering the page
    const animateCover = (now: number) => {
      const elapsed = now - startCoverTime;
      const progress = Math.min(elapsed / COVER_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const pixelsToShow = Math.floor(eased * total);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = nextColor;
      for (let i = 0; i < pixelsToShow; i++) {
        const idx = coverIndices[i];
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateCover);
      } else {
        // Screen is 100% covered. Switch theme underneath completely invisibly!
        ctx.fillStyle = nextColor;
        ctx.fillRect(0, 0, w, h);
        setTheme(nextTheme);

        // Brief delay then start Phase 2: Pixel dissolve reveal
        setTimeout(() => {
          // Shuffled indices for reveal phase
          const revealIndices = Array.from({ length: total }, (_, i) => i);
          for (let i = revealIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [revealIndices[i], revealIndices[j]] = [revealIndices[j], revealIndices[i]];
          }

          const startRevealTime = performance.now();

          const animateReveal = (now2: number) => {
            const elapsed2 = now2 - startRevealTime;
            const prog2 = Math.min(elapsed2 / REVEAL_DURATION, 1);
            const eased2 = 1 - Math.pow(1 - prog2, 3);
            const pixelsToClear = Math.floor(eased2 * total);

            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = nextColor;

            const remaining = total - pixelsToClear;
            for (let i = 0; i < remaining; i++) {
              const idx = revealIndices[i];
              const col = idx % cols;
              const row = Math.floor(idx / cols);
              ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
            }

            if (prog2 < 1) {
              rafRef.current = requestAnimationFrame(animateReveal);
            } else {
              ctx.clearRect(0, 0, w, h);
              setTransitioning(false);
            }
          };

          rafRef.current = requestAnimationFrame(animateReveal);
        }, 40);
      }
    };

    rafRef.current = requestAnimationFrame(animateCover);
  }, []);

  const toggleTheme = useCallback(() => {
    if (transitioning) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTransitioning(true);
    runPixelTransition(nextTheme);
  }, [theme, transitioning, runPixelTransition]);

  // Initial load pixel reveal animation
  const hasPlayedIntro = useRef(false);
  useEffect(() => {
    if (hasPlayedIntro.current) return;
    hasPlayedIntro.current = true;

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

    const color = theme === "dark" ? "hsl(0 0% 7%)" : "hsl(0 0% 96%)";

    // Start fully covered
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);

    const indices = Array.from({ length: total }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Delay then clear pixels to reveal text & elements
    setTimeout(() => {
      const clearStart = performance.now();
      const clearAnimate = (now: number) => {
        const elapsed = now - clearStart;
        const prog = Math.min(elapsed / REVEAL_DURATION, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        const pixelsToClear = Math.floor(eased * total);

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = color;

        const remaining = total - pixelsToClear;
        for (let i = 0; i < remaining; i++) {
          const idx = indices[i];
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }

        if (prog < 1) {
          rafRef.current = requestAnimationFrame(clearAnimate);
        } else {
          ctx.clearRect(0, 0, w, h);
        }
      };
      rafRef.current = requestAnimationFrame(clearAnimate);
    }, 250);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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
