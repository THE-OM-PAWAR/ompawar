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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
      setTimeout(() => setIsTransitioning(false), 500);
    }, 150);
  }, []);

  return (
    <>
      {/* Full-screen transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998] bg-background pointer-events-none"
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
            initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ThemeToggle;
