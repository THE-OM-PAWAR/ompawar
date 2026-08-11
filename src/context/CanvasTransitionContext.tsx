import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type ViewId = "home" | "projects" | "building" | "skills" | "about" | "contact";

export interface CanvasNode {
  id: ViewId;
  title: string;
  x: number;
  y: number;
}

export interface CameraLog {
  currentCamera: { x: number; y: number };
  targetCenter: { x: number; y: number };
  delta: { dx: number; dy: number };
  distance: number;
  direction: string;
  duration: number;
}

interface CanvasTransitionContextType {
  currentView: ViewId;
  targetView: ViewId | null;
  isTransitioning: boolean;
  nodes: Record<ViewId, CanvasNode>;
  cameraLog: CameraLog | null;
  transitionTo: (viewId: ViewId, scrollToSectionId?: string) => void;
  completeTransition: () => void;
  pendingScrollId: string | null;
  clearPendingScroll: () => void;
}

// Calculate spatial positions based on screen dimensions
const getInitialNodes = (): Record<ViewId, CanvasNode> => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1400;
  const height = typeof window !== "undefined" ? window.innerHeight : 900;
  const spacingX = Math.max(width * 1.25, 1400);
  const spacingY = Math.max(height * 1.25, 1000);

  return {
    home: { id: "home", title: "Home View", x: 0, y: 0 },
    projects: { id: "projects", title: "Projects Showcase", x: spacingX, y: -spacingY },
    building: { id: "building", title: "Building & Ventures", x: -spacingX, y: spacingY },
    skills: { id: "skills", title: "Skills & Technical Stack", x: spacingX, y: spacingY },
    about: { id: "about", title: "About Section", x: 0, y: spacingY * 2 },
    contact: { id: "contact", title: "Contact Section", x: spacingX, y: spacingY * 2 },
  };
};

const CanvasTransitionContext = createContext<CanvasTransitionContextType | undefined>(
  undefined
);

export const CanvasTransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<Record<ViewId, CanvasNode>>(getInitialNodes);
  const [currentView, setCurrentView] = useState<ViewId>("home");
  const [targetView, setTargetView] = useState<ViewId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cameraLog, setCameraLog] = useState<CameraLog | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setNodes(getInitialNodes());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transitionTo = useCallback(
    (targetId: ViewId, scrollToSectionId?: string) => {
      if (isTransitioning || (targetId === currentView && !scrollToSectionId)) {
        if (scrollToSectionId && targetId === currentView) {
          const el = document.getElementById(scrollToSectionId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      if (scrollToSectionId) {
        setPendingScrollId(scrollToSectionId);
      }

      const fromNode = nodes[currentView];
      const toNode = nodes[targetId];

      if (!fromNode || !toNode) return;

      const startX = fromNode.x;
      const startY = fromNode.y;
      const targetX = toNode.x;
      const targetY = toNode.y;

      const dx = targetX - startX;
      const dy = targetY - startY;
      const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

      let direction = "";
      if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx > 0 ? "RIGHT →" : "← LEFT";
      } else if (Math.abs(dy) > Math.abs(dx)) {
        direction = dy > 0 ? "DOWN ↓" : "UP ↑";
      } else {
        direction =
          dx > 0
            ? dy > 0
              ? "DIAGONAL DOWN-RIGHT ↘"
              : "DIAGONAL UP-RIGHT ↗"
            : dy > 0
              ? "DIAGONAL DOWN-LEFT ↙"
              : "DIAGONAL UP-LEFT ↖";
      }

      const duration = Math.min(Math.max(Math.round(distance * 0.38), 500), 750);

      const logData: CameraLog = {
        currentCamera: { x: startX, y: startY },
        targetCenter: { x: targetX, y: targetY },
        delta: { dx, dy },
        distance,
        direction,
        duration,
      };

      setCameraLog(logData);

      console.log(
        `%c[Canvas Camera Controller]`,
        "color: #3b82f6; font-weight: bold; font-size: 13px;"
      );
      console.log(`Current camera:  (x: ${startX}, y: ${startY})`);
      console.log(`Target center:   (x: ${targetX}, y: ${targetY})`);
      console.log(`Delta:           (dx: ${dx}, dy: ${dy})`);
      console.log(`Distance:        ${distance} px`);
      console.log(`Direction:       ${direction}`);
      console.log(`Duration:        ${duration} ms`);

      setTargetView(targetId);
      setIsTransitioning(true);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    },
    [currentView, isTransitioning, nodes]
  );

  const completeTransition = useCallback(() => {
    setTargetView((prevTarget) => {
      if (prevTarget) {
        setCurrentView(prevTarget);
      }
      return null;
    });
    setIsTransitioning(false);
  }, []);

  const clearPendingScroll = useCallback(() => {
    setPendingScrollId(null);
  }, []);

  return (
    <CanvasTransitionContext.Provider
      value={{
        currentView,
        targetView,
        isTransitioning,
        nodes,
        cameraLog,
        transitionTo,
        completeTransition,
        pendingScrollId,
        clearPendingScroll,
      }}
    >
      {children}
    </CanvasTransitionContext.Provider>
  );
};

export const useCanvasTransition = () => {
  const context = useContext(CanvasTransitionContext);
  if (!context) {
    throw new Error("useCanvasTransition must be used within a CanvasTransitionProvider");
  }
  return context;
};
