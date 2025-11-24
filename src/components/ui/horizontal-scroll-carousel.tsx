"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMemo, useRef } from "react";

import {
  getFeaturedProjects,
  type ProjectDetail,
} from "../../data/project.data";

export default function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const projects = useMemo(() => getFeaturedProjects(7), []);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5 px-6 sm:gap-6 sm:px-8">
          {projects.map((project, index) => (
            <ProjectCard
              project={project}
              key={project.id}
              isPriority={index === 0}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const ProjectCard = ({
  project,
  isPriority,
}: {
  project: ProjectDetail;
  isPriority: boolean;
}) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative h-[500px] w-[420px] overflow-hidden bg-neutral-900 sm:h-[600px] sm:w-[700px] md:h-[700px] md:w-[800px] lg:h-[800px] lg:w-[900px]"
    >
      <div className="absolute inset-0">
        <Image
          src={project.heroImage}
          alt={project.heroTitle}
          fill
          sizes="(max-width: 1024px) 90vw, 900px"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={isPriority}
        />
        <div className="absolute inset-0 bg-neutral-950/60 transition duration-300 group-hover:bg-neutral-950/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          {project.category}
        </p>
        <h3 className="mb-4 mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {project.title}
        </h3>
        <div className="h-0.5 w-12 bg-white transition-all duration-300 group-hover:w-24 sm:w-16 sm:group-hover:w-32 md:w-20 md:group-hover:w-40" />
      </div>

      <div className="pointer-events-none absolute inset-0 border border-white/5 transition group-hover:border-white/15" />
    </Link>
  );
};
