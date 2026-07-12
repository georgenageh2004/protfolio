"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import SkillCard from "./SkillCard";
import SectionTitle from "./SectionTitle";

type SkillCategory = "all" | "frontend" | "backend" | "tools" | "language";

const categoryFilters: { id: SkillCategory; label: string }[] = [
  { id: "all", label: "All Tech" },
  { id: "language", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools Ecosystem" },
];

/**
 * Skills section — renders all skills via map() from the skills data array.
 * Features a premium SaaS category filter with clean animations.
 */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  // Filter skills based on selected category
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-32 relative overflow-hidden"
      aria-label="Skills section"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Top and bottom accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px mt-20px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionTitle
          label="Technical Stack"
          title="Skills & Technologies"
          highlight="Technologies"
          subtitle="A comprehensive overview of my programming languages, frontend libraries, backend runtimes, and developer tools."
        >
          {/* Emojiless Premium Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer select-none"
                style={{
                  background:
                    activeCategory === filter.id
                      ? "var(--primary)"
                      : "var(--surface)",
                  color:
                    activeCategory === filter.id ? "#ffffff" : "var(--text-secondary)",
                  borderColor:
                    activeCategory === filter.id
                      ? "var(--primary)"
                      : "var(--border-strong)",
                  boxShadow:
                    activeCategory === filter.id
                      ? "0 4px 20px rgba(0, 122, 255, 0.18)"
                      : "none",
                }}
                aria-pressed={activeCategory === filter.id}
                id={`filter-${filter.id}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </SectionTitle>

        {/* ── SKILL CARDS GRID ── */}
        <motion.div
          key={activeCategory} // Staggers entry again when filter changes
          // التعديل هنا: gap-8 بتكبر المسافة بين الكروت، و mt-16 بتبعدهم عن الزراير اللي فوق
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-16"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label={`${activeCategory === "all" ? "All" : activeCategory} skills`}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Count summary */}
        <motion.div
          className="text-center text-sm mt-12" // كبرنا المارجن هنا كمان عشان يتناسب مع المساحات الجديدة
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Showing{" "}
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>
            {filteredSkills.length}
          </span>{" "}
          technologies
        </motion.div>
      </div>
    </section>
  );
}