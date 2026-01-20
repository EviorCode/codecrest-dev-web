"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getFeaturedProjects,
  type ProjectDetail,
} from "../../data/project.data";

export default function ProjectsCarousel() {
  const projects = useMemo(() => getFeaturedProjects(4), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [projects.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 100 : -100,
    }),
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            A selection of our recent work
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all backdrop-blur-sm shadow-sm"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all backdrop-blur-sm shadow-sm"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Project Card */}
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ProjectCard project={currentProject} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-neutral-900 w-8"
                    : "bg-neutral-300 w-2 hover:bg-neutral-400"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium"
          >
            View all projects
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectDetail }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-neutral-900"
    >
      {/* Image */}
      <Image
        src={project.heroImage}
        alt={project.heroTitle}
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover transition duration-700 group-hover:scale-105"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-3">
          {project.category}
        </p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm md:text-base max-w-2xl line-clamp-2 mb-4">
          {project.heroSubtitle}
        </p>
        <div className="h-0.5 w-12 bg-white/50 transition-all duration-300 group-hover:w-24 group-hover:bg-white" />
      </div>

      {/* Border */}
      <div className="absolute inset-0 border border-white/10 rounded-xl transition group-hover:border-white/20" />
    </Link>
  );
}
