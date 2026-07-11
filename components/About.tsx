"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Code2, Award, Calendar } from "lucide-react";
import SectionTitle from "./SectionTitle";

/** Stat card data type */
interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

/** Statistics for the counter cards rendered via map() */
const stats: Stat[] = [
  {
    id: "projects",
    value: 10,
    suffix: "+",
    label: "Projects",
    icon: Code2,
    color: "#007AFF",
    description: "Completed projects",
  },
  {
    id: "trainings",
    value: 3,
    suffix: "",
    label: "Trainings",
    icon: Award,
    color: "#5977B1",
    description: "ITI, DEPI, Instant",
  },
  {
    id: "technologies",
    value: 15,
    suffix: "+",
    label: "Technologies",
    icon: BookOpen,
    color: "#D75600",
    description: "Tools & frameworks",
  },
  {
    id: "years",
    value: 3,
    suffix: "+",
    label: "Years Learning",
    icon: Calendar,
    color: "#059669",
    description: "Continuous growth",
  },
];

/** Animated number counter hook */
function useCounter(target: number, duration = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, start]);

  return count;
}

/** Individual stat card with animated counter */
function StatCard({ stat, shouldAnimate }: { stat: Stat; shouldAnimate: boolean }) {
  const count = useCounter(stat.value, 1600, shouldAnimate);
  const Icon = stat.icon;

  return (
    <div className="stat-card">
      <div
        className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
        style={{ background: `${stat.color}18` }}
      >
        <Icon size={22} style={{ color: stat.color }} />
      </div>
      <div
        className="text-3xl font-black mb-1"
        style={{ color: stat.color }}
        aria-label={`${count}${stat.suffix} ${stat.label}`}
      >
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        {stat.label}
      </div>
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
        {stat.description}
      </div>
    </div>
  );
}

/**
 * About section with:
 * - useEffect for intersection observer (triggers counter animation)
 * - Animated counter cards rendered via map()
 * - Two-column layout (text + stats)
 */
export default function About() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger counter animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  /** Highlight text helper */
  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="font-semibold" style={{ color: "var(--primary)" }}>
      {children}
    </span>
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      aria-label="About Me section"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionTitle
          label="Get to Know Me"
          title="About Me"
          highlight="Me"
          subtitle="A passionate developer on a mission to craft exceptional digital experiences."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-6">
          {/* ── LEFT: BIO TEXT ── */}
          <motion.div
            className="space-y-6"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              <>
                I&apos;m <Highlight>George Nageh</Highlight>, a Computer Science student at{" "}
                <Highlight>El Shorouk Academy</Highlight>. I&apos;m passionate about turning
                complex ideas into clean, performant web applications.
              </>,
              <>
                I specialize in <Highlight>Frontend Development</Highlight> using Angular and
                also have experience building scalable <Highlight>REST APIs</Highlight> with{" "}
                <Highlight>.NET</Highlight>.
              </>,
              <>
                I enjoy transforming UI designs into fast, responsive, and{" "}
                <Highlight>user-friendly applications</Highlight>. I take pride in writing
                clean, maintainable code that scales.
              </>,
              <>
                I&apos;ve completed professional training through{" "}
                <Highlight>ITI</Highlight>, <Highlight>DEPI</Highlight>, and{" "}
                <Highlight>Instant Academy</Highlight> while continuously improving my skills
                through real-world projects and online learning.
              </>,
            ].map((text, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                variants={itemVariants}
              >
                <div
                  className="w-1 min-h-full rounded-full flex-shrink-0 mt-1"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(to bottom, #007AFF, #5977B1)"
                      : "linear-gradient(to bottom, #5977B1, #D75600)",
                    minHeight: "100%",
                  }}
                  aria-hidden="true"
                />
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {text}
                </p>
              </motion.div>
            ))}

            {/* Training badges */}
            <motion.div className="flex flex-wrap gap-2 pt-2" variants={itemVariants}>
              {["ITI Graduate", "DEPI Trainee", "Instant Academy", "Angular Expert", "Open to Work"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="text-xs px-3 py-1.5 rounded-full font-medium border"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border-strong)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {badge}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: STATS GRID ── */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <StatCard stat={stat} shouldAnimate={hasAnimated} />
                </motion.div>
              ))}
            </div>

            {/* Quote card below stats */}
            <motion.div
              className="mt-6 glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                &ldquo;Code is like humor. When you have to explain it, it&apos;s bad.&rdquo;
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: "var(--primary)" }}>
                — Cory House
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
