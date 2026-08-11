import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedDigit = ({ digit }: { digit: number }) => {
  return (
    <div className="relative inline-block w-[1ch] overflow-hidden leading-none tabular-nums">
      <div className="invisible">0</div>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const LiveClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const isPM = hours >= 12;
  const displayHours = hours % 12 || 12;

  const h1 = Math.floor(displayHours / 10);
  const h2 = displayHours % 10;
  const m1 = Math.floor(minutes / 10);
  const m2 = minutes % 10;

  return (
    <div className="items-center gap-2 font-mono text-foreground z-[9990] fixed top-4 right-6 hidden md:flex text-sm">
      <span className="mr-4">INDIA</span>
      <span className="flex items-center">
        <AnimatedDigit digit={h1} />
        <AnimatedDigit digit={h2} />
        <span className="mx-0.5 animate-pulse text-muted-foreground">:</span>
        <AnimatedDigit digit={m1} />
        <AnimatedDigit digit={m2} />
        <span className="ml-1 text-[10px] sm:text-xs font-semibold text-muted-foreground">
          {isPM ? "PM" : "AM"}
        </span>
      </span>
    </div>
  );
};

export default LiveClock;
