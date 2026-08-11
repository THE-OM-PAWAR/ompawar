import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";
import ProjectsView from "@/components/ProjectsView";
import BuildingView from "@/components/BuildingView";
import SkillsView from "@/components/SkillsView";

interface CanvasViewportProps {
  homeContent: React.ReactNode;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({ homeContent }) => {
  const {
    currentView,
    targetView,
    isTransitioning,
    nodes,
    cameraLog,
    completeTransition,
    pendingScrollId,
    clearPendingScroll,
  } = useCanvasTransition();

  // Handle scroll after returning to home
  useEffect(() => {
    if (!isTransitioning && currentView === "home" && pendingScrollId) {
      const el = document.getElementById(pendingScrollId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          clearPendingScroll();
        }, 100);
      } else {
        clearPendingScroll();
      }
    }
  }, [isTransitioning, currentView, pendingScrollId, clearPendingScroll]);

  const activeView = isTransitioning && targetView ? targetView : currentView;

  // Compute camera start and target world coordinates
  const fromView = currentView;
  const toView = targetView || currentView;

  const fromNode = nodes[fromView] || { x: 0, y: 0 };
  const toNode = nodes[toView] || { x: 0, y: 0 };

  // World container transform values (-cameraPosition)
  const startCamX = -fromNode.x;
  const startCamY = -fromNode.y;
  const endCamX = -toNode.x;
  const endCamY = -toNode.y;

  const durationMs = cameraLog?.duration || 700;

  return (
    <div className={`relative min-h-screen w-full bg-background ${isTransitioning ? "overflow-hidden h-screen" : "overflow-x-hidden"}`}>
      {/* Subtle Canvas Dot Grid Pattern during transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pointer-events-none bg-[radial-gradient(var(--border)_1.5px,transparent_1.5px)] [background-size:24px_24px]"
          />
        )}
      </AnimatePresence>

      {/* RENDER MODE 1: Transition Phase (2D Spatial Camera Canvas World) */}
      {isTransitioning ? (
        <motion.div
          initial={{
            x: startCamX,
            y: startCamY,
          }}
          animate={{
            x: endCamX,
            y: endCamY,
          }}
          transition={{
            duration: durationMs / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={() => {
            completeTransition();
          }}
          className="w-full min-h-screen pointer-events-none select-none"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Spatial World Canvas Layout */}
          <div className="relative w-full min-h-screen">
            {/* Home Frame */}
            <div
              className="absolute top-0 left-0 w-full min-h-screen"
              style={{
                transform: `translate3d(${nodes.home.x}px, ${nodes.home.y}px, 0)`,
              }}
            >
              {homeContent}
            </div>

            {/* Projects Frame */}
            <div
              className="absolute top-0 left-0 w-full min-h-screen"
              style={{
                transform: `translate3d(${nodes.projects.x}px, ${nodes.projects.y}px, 0)`,
              }}
            >
              <ProjectsView />
            </div>

            {/* Building Frame */}
            <div
              className="absolute top-0 left-0 w-full min-h-screen"
              style={{
                transform: `translate3d(${nodes.building.x}px, ${nodes.building.y}px, 0)`,
              }}
            >
              <BuildingView />
            </div>

            {/* Skills Frame */}
            <div
              className="absolute top-0 left-0 w-full min-h-screen"
              style={{
                transform: `translate3d(${nodes.skills.x}px, ${nodes.skills.y}px, 0)`,
              }}
            >
              <SkillsView />
            </div>
          </div>
        </motion.div>
      ) : (
        /* RENDER MODE 2: Normal Document Flow (100% Native Webpage Scrolling & Interactions) */
        <div className="w-full min-h-screen relative">
          {activeView === "home" && homeContent}
          {activeView === "projects" && <ProjectsView />}
          {activeView === "building" && <BuildingView />}
          {activeView === "skills" && <SkillsView />}
        </div>
      )}
    </div>
  );
};

export default CanvasViewport;
