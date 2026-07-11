"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen — full-screen animated loading overlay shown
 * for the first 1.8 seconds on initial page load.
 * Uses useState and useEffect to auto-dismiss.
 */
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dismiss loading screen after 1.8s
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-label="Loading"
          role="status"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-4xl font-black gradient-text-blue"
              aria-hidden="true"
            >
              George.
            </span>
          </motion.div>

          {/* Spinner ring */}
          <motion.div
            className="w-10 h-10 rounded-full border-3"
            style={{
              borderColor: "rgba(0,122,255,0.2)",
              borderTopColor: "#007AFF",
              borderWidth: "3px",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />

          {/* Progress dots */}
          <div className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#007AFF" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          <span className="sr-only">Loading George Nageh&apos;s portfolio...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
