"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number; // For staggered animation delay
}

/**
 * Map project color keys to real CSS gradient strings.
 * Avoids dynamic Tailwind class generation which doesn't work at runtime.
 */
const gradientMap: Record<string, string> = {
  blue: "linear-gradient(135deg, #3b82f6, #6366f1, #9333ea)",
  green: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)",
  orange: "linear-gradient(135deg, #f97316, #f59e0b, #eab308)",
};

/**
 * Reusable ProjectCard component.
 * Receives a Project object via props and renders a premium card
 * with image, title, description, tech stack, and action buttons.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const overlayGradient = gradientMap[project.color] ?? gradientMap.blue;

  return (
    <motion.article
      className="project-card flex flex-col h-full group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.image}
          alt={`${project.title} - ${project.subtitle}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay on hover — inline style avoids broken dynamic Tailwind classes */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
          style={{ background: overlayGradient }}
          aria-hidden="true"
        />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            >
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Hover overlay with quick links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={18} />
          </a>
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8 flex flex-col flex-grow justify-between">
        <div>
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(0, 122, 255, 0.08)",
                  color: "var(--primary)",
                  border: "1px solid rgba(0, 122, 255, 0.15)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-1 group-hover:text-[#007AFF] transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm font-medium mb-3.5" style={{ color: "var(--primary)" }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm py-2 px-4"
            aria-label={`${project.title} GitHub repository`}
            id={`project-github-${project.id}`}
          >
            <Github size={15} />
            GitHub
          </a>

          {project.live !== "#" ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-4"
              aria-label={`${project.title} live demo`}
              id={`project-live-${project.id}`}
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          ) : (
            <span
              className="flex items-center gap-1.5 text-sm font-medium group/link cursor-default"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
