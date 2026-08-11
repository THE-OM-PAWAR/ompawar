import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Building2, Cpu, FolderGit2, X } from "lucide-react";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";

const PIXEL_SIZE = 12;
const COVER_DURATION = 400;
const REVEAL_DURATION = 550;

interface DockButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
}

const DockButton = ({ label, onClick, children }: DockButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 5, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-full mr-2.5 px-2 py-0.5 text-[11px] font-medium text-foreground bg-popover/95 backdrop-blur-sm border border-border/60 rounded shadow-sm whitespace-nowrap pointer-events-none z-50"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
        className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border/80 bg-background/90 backdrop-blur-md text-foreground shadow-sm transition-colors hover:bg-muted"
      >
        {children}
      </motion.button>
    </div>
  );
};

const FloatingDock = () => {
  // Theme state & transition logic
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

    const coverIndices = Array.from({ length: total }, (_, i) => i);
    for (let i = coverIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coverIndices[i], coverIndices[j]] = [coverIndices[j], coverIndices[i]];
    }

    const nextColor = nextTheme === "dark" ? "hsl(0 0% 7%)" : "hsl(0 0% 96%)";
    const startCoverTime = performance.now();

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
        ctx.fillStyle = nextColor;
        ctx.fillRect(0, 0, w, h);
        setTheme(nextTheme);

        setTimeout(() => {
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

  // Initial load animation
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

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);

    const indices = Array.from({ length: total }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

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

  const { transitionTo, currentView } = useCanvasTransition();

  const handleNavClick = (sectionId: string) => {
    if (sectionId === "projects" || sectionId === "building" || sectionId === "skills") {
      transitionTo(sectionId as any);
    } else {
      if (currentView !== "home") {
        transitionTo("home", sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const isBuildingActive = currentView === "building";
  const isSkillsActive = currentView === "skills";
  const isProjectsActive = currentView === "projects";

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Vertical Dock Column at Bottom Right */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 z-[9999] flex flex-col items-center gap-2 sm:gap-2.5">
        {/* Building Button */}
        <DockButton
          label={isBuildingActive ? "Back to Home" : "Building"}
          onClick={() =>
            isBuildingActive ? transitionTo("home") : handleNavClick("building")
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isBuildingActive ? "close" : "icon"}
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              {isBuildingActive ? (
                <X size={16} strokeWidth={1.5} />
              ) : (
                <Building2 size={16} strokeWidth={1.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </DockButton>

        {/* Skills Button */}
        <DockButton
          label={isSkillsActive ? "Back to Home" : "Skills"}
          onClick={() =>
            isSkillsActive ? transitionTo("home") : handleNavClick("skills")
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isSkillsActive ? "close" : "icon"}
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              {isSkillsActive ? (
                <X size={16} strokeWidth={1.5} />
              ) : (
                <Cpu size={16} strokeWidth={1.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </DockButton>

        {/* Projects Button */}
        <DockButton
          label={isProjectsActive ? "Back to Home" : "Projects"}
          onClick={() =>
            isProjectsActive ? transitionTo("home") : handleNavClick("projects")
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isProjectsActive ? "close" : "icon"}
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              {isProjectsActive ? (
                <X size={16} strokeWidth={1.5} />
              ) : (
                <FolderGit2 size={16} strokeWidth={1.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </DockButton>

        {/* Theme Toggle Button */}
        <DockButton
          label={theme === "light" ? "Dark Mode" : "Light Mode"}
          onClick={toggleTheme}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ y: 10, opacity: 0, filter: "blur(2px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -10, opacity: 0, filter: "blur(2px)" }}
              transition={{ duration: 0.2 }}
            >
              {theme === "light" ? (
                <Sun size={16} strokeWidth={1.5} />
              ) : (
                <Moon size={16} strokeWidth={1.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </DockButton>
      </div>
    </>
  );
};

export default FloatingDock;
