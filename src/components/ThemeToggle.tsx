import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [transitioning, setTransitioning] = useState(false);
  const [overlayTheme, setOverlayTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (transitioning) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setOverlayTheme(nextTheme);
    setTransitioning(true);
  }, [theme, transitioning]);

  const handleOverlayComplete = useCallback(
    (definition: string) => {
      if (definition === "visible") {
        // Overlay fully covers screen — switch theme underneath
        setTheme(overlayTheme);
        // Small delay then dismiss overlay
        setTimeout(() => setTransitioning(false), 80);
      }
    },
    [overlayTheme]
  );

  return (
    <>
      {/* Slide-up overlay with blur */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ y: "100%", filter: "blur(12px)" }}
            animate="visible"
            exit={{ y: "-100%", filter: "blur(12px)" }}
            variants={{
              visible: { y: "0%", filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={handleOverlayComplete}
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{
              backgroundColor:
                overlayTheme === "dark"
                  ? "hsl(0 0% 7%)"
                  : "hsl(0 0% 96%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-[9999] flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-colors hover:opacity-80"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ThemeToggle;
