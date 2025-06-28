"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface FlipWordsProps {
  words: string[];
  className?: string;
}

export function FlipWords({ words, className }: FlipWordsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-gradient-to-b from-blue-600 to-blue-400 bg-clip-text text-transparent"
        >
          {words[currentWordIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
} 