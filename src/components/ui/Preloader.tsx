import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const words = [
  "Hello",
  "வணக்கம்", // Tamil Greeting
  "Welcome",
  "Design",
  "Code",
  "Build",
  "Deploy",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    }, 240);

    const totalDuration = 2000;
    const intervalTime = 20;
    const increment = 100 / (totalDuration / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(wordInterval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-10 bg-[#030305] text-white select-none"
    >
      <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/30">
        <span>Portfolio loading</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="flex justify-center items-center flex-1">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight"
        >
          <span className="text-accent-lime">•</span> {words[index]}
        </motion.p>
      </div>

      <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
