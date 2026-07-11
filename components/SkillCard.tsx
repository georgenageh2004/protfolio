"use client";

import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

interface SkillCardProps {
  skill: Skill;
  index: number; // For staggered animation delay
}

/** Color map for premium accent highlights */
const colorMap: Record<string, string> = {
  orange: "#f97316",
  blue: "#007AFF",
  amber: "#f59e0b",
  purple: "#a855f7",
  red: "#ef4444",
  cyan: "#06b6d4",
  slate: "#64748b",
  teal: "#14b8a6",
  violet: "#8b5cf6",
  pink: "#ec4899",
  indigo: "#6366f1",
  emerald: "#10b981",
};

/** Get label based on proficiency level */
const getLevelLabel = (level: number) => {
  if (level >= 5) return "Expert";
  if (level >= 4) return "Advanced";
  return "Intermediate";
};

/**
 * Reusable, redesigned premium SkillCard component.
 * Features ultra-clean layouts, premium typography, progress bar,
 * and custom color accent highlights on hover without emojis.
 */
export default function SkillCard({ skill, index }: SkillCardProps) {
  const accentColor = colorMap[skill.color] ?? "#007AFF";
  const percentage = (skill.level / 5) * 100;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 group select-none"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{
        y: -4,
        borderColor: accentColor,
        boxShadow: `0 10px 30px -15px ${accentColor}40`,
      }}
    >
      {/* Top accent highlight bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
        style={{ background: accentColor }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4 mb-2">
        {/* Skill Name */}
        <h3
          className="font-bold text-base tracking-tight transition-colors duration-200"
          style={{ color: "var(--text-primary)" }}
        >
          {skill.name}
        </h3>

        {/* Level Label */}
        <span
          className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md"
          style={{
            background: `${accentColor}12`,
            color: accentColor,
          }}
        >
          {getLevelLabel(skill.level)}
        </span>
      </div>

      {/* Proficiency Progress Bar */}
      <div className="mt-4" aria-label={`Proficiency: ${getLevelLabel(skill.level)}`}>
        <div className="w-full h-1 bg-[var(--border-strong)] rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full"
            style={{ background: accentColor }}
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
