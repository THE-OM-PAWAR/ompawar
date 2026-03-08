import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-[4.5rem] z-[9999] flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <div className="flex items-center justify-center gap-[3px] h-4 w-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-[2.5px] rounded-full bg-foreground"
            animate={
              playing
                ? {
                    height: ["4px", "14px", "6px", "10px", "4px"],
                  }
                : { height: "4px" }
            }
            transition={
              playing
                ? {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>
    </motion.button>
  );
};

export default MusicPlayer;
