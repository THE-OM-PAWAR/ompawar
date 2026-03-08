import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const AnimatedDigit = ({ digit }: { digit: number }) => {
  return (
    <div className="relative inline-block w-[1ch] overflow-hidden leading-none tabular-nums">
      <div className="invisible">0</div>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const isPM = hours >= 12;
  const displayHours = hours % 12 || 12;

  const h1 = Math.floor(displayHours / 10);
  const h2 = displayHours % 10;
  const m1 = Math.floor(minutes / 10);
  const m2 = minutes % 10;

  return (
    <div className="items-center gap-2 font-mono text-foreground fixed top-4 right-4 hidden md:flex text-sm">
      <span className="mr-4">INDIA</span>
      <span className="flex items-center">
        <AnimatedDigit digit={h1} />
        <AnimatedDigit digit={h2} />
        <span className="mx-0.5">:</span>
        <AnimatedDigit digit={m1} />
        <AnimatedDigit digit={m2} />
        <span className="ml-1.5">{isPM ? "PM" : "AM"}</span>
      </span>
    </div>
  );
};

export default LiveClock;
