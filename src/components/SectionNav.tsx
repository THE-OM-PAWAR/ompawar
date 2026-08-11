import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";

export interface SectionItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: SectionItem[];
}

const SectionNav = ({ sections }: SectionNavProps) => {
  const { transitionTo, currentView } = useCanvasTransition();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (currentView !== "home") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, currentView]);

  const scrollTo = (id: string) => {
    if (id === "projects" || id === "building" || id === "skills") {
      transitionTo(id as any);
    } else {
      if (currentView !== "home") {
        transitionTo("home", id);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 sm:right-5 top-[26%] -translate-y-1/2 z-40 flex flex-col items-end gap-1.5 pointer-events-auto"
    >
      {sections.map((section) => {
        const isActive = activeId === section.id;
        const isHovered = hoveredId === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center group cursor-pointer py-0.5"
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => scrollTo(section.id)}
          >
            {/* Label Tooltip on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 5, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 4, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-full mr-2.5 px-2 py-0.5 text-[11px] font-medium text-foreground bg-popover/95 backdrop-blur-sm border border-border/60 rounded shadow-sm whitespace-nowrap pointer-events-none"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Compact Horizontal Bar Indicator */}
            <button
              type="button"
              aria-label={`Scroll to ${section.label}`}
              className="focus:outline-none flex items-center justify-end"
            >
              <motion.span
                animate={{
                  width: isActive ? 18 : isHovered ? 14 : 10,
                  height: isActive ? 2.5 : 1.5,
                  opacity: isActive ? 1 : isHovered ? 0.8 : 0.35,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`block rounded-full transition-colors ${
                  isActive
                    ? "bg-foreground shadow-[0_0_6px_rgba(255,255,255,0.4)] dark:shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                    : "bg-muted-foreground hover:bg-foreground"
                }`}
              />
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default SectionNav;
