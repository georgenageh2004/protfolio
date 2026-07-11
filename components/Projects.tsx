"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";

/**
 * Projects section — renders all projects via map() from the projects data array.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
      aria-label="Projects section"
    >
      {/* Background decoration */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #007AFF, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D75600, transparent)" }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionTitle
          label="My Work"
          title="Featured Projects"
          highlight="Projects"
          subtitle="A selection of projects that showcase my skills and passion for building great software."
        />

        {/* ── PROJECTS GRID rendered via map() ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/georgenageh2004"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="view-all-projects-btn"
            aria-label="View all projects on GitHub"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
