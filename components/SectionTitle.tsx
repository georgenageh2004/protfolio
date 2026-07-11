"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
  label: string;          // Small badge text above the title
  title: string;          // Main section title
  highlight?: string;     // Highlighted (gradient) word in title
  subtitle?: string;      // Optional subtitle paragraph
  centered?: boolean;     // Center alignment
  children?: ReactNode;
}

/**
 * Reusable SectionTitle component used across all sections.
 * Supports label badge, main title with optional gradient highlight,
 * and an optional subtitle paragraph.
 */
export default function SectionTitle({
  label,
  title,
  highlight,
  subtitle,
  centered = true,
  children,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
      {/* Label Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={centered ? "flex justify-center" : ""}
      >
        <span className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] inline-block" />
          {label}
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        className="section-title mt-3"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {highlight ? (
          <>
            {title.replace(highlight, "").split(highlight)[0]}
            <span className="gradient-text-blue"> {highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          className="mt-4 text-base max-w-2xl leading-relaxed"
          style={{ color: "var(--text-secondary)", margin: centered ? "1rem auto 0" : "1rem 0 0" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Optional children (e.g., filter tabs) */}
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </motion.div>
      )}

      {/* Decorative underline */}
      <motion.div
        className={`mt-5 h-px bg-gradient-to-r from-transparent via-[#007AFF] to-transparent max-w-xs ${centered ? "mx-auto" : ""}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </div>
  );
}
