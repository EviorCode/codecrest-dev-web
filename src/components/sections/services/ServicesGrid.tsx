"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { ServiceDetail } from "@/src/data/service.data";

interface ServicesGridProps {
  sections: {
    category: string;
    services: ServiceDetail[];
  }[];
}

const letterVariants: Variants = {
  hover: {
    y: "-50%",
  },
};

const Card = ({ service }: { service: ServiceDetail }) => {
  const letters = service.heroTitle.split("");

  return (
    <Link href={`/services/${service.slug}`} className="block" prefetch={false}>
      <motion.div
        transition={{ staggerChildren: 0.035 }}
        whileHover="hover"
        className="group relative h-80 w-full cursor-pointer overflow-hidden  bg-neutral-900"
      >
        <Image
          src={service.heroImage}
          alt={service.heroTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 object-cover saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

        <div className="relative z-20 flex h-full flex-col justify-between p-6 text-neutral-300 transition-colors duration-500 group-hover:text-white lg:p-8">
          <div className="flex items-start justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
              <span className="text-white/90">{service.category}</span>
              {service.features?.length ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span className="text-white/60">
                    {service.features.length} capabilities
                  </span>
                </>
              ) : null}
            </div>

            <ArrowUpRight className="h-8 w-8 text-white/80 transition-transform duration-500 group-hover:-rotate-45 group-hover:text-white" />
          </div>

          <div className="space-y-3">
            <h3 className="inline-block text-3xl font-bold leading-tight lg:text-4xl">
              {letters.map((letter, index) => (
                <AnimatedLetter
                  letter={letter}
                  key={`${service.id}-${index}`}
                />
              ))}
            </h3>

            <p className="line-clamp-2 text-sm leading-relaxed text-white/80 lg:text-base">
              {service.heroDescription}
            </p>

            {service.relatedServices?.length ? (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {service.relatedServices.slice(0, 3).map((related) => (
                  <span
                    key={related}
                    className="border border-purple-500/10 bg-purple-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white/70 backdrop-blur-sm transition-colors duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/10"
                  >
                    {related}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const AnimatedLetter = ({ letter }: { letter: string }) => {
  const displayLetter = letter === " " ? "\u00A0" : letter;

  return (
    <span className="inline-block h-[36px] overflow-hidden font-bold uppercase lg:h-[42px]">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{displayLetter}</span>
        <span>{displayLetter}</span>
      </motion.span>
    </span>
  );
};

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 60 : -60,
  }),
};

export function ServicesGrid({ sections }: ServicesGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
  }, [sections.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  }, [sections.length]);

  const currentSection = sections[currentIndex];

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* Category Navigation */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full border border-black/20 text-black/60 hover:text-black hover:border-black/40 transition-all"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-black/20 text-black/60 hover:text-black hover:border-black/40 transition-all"
              aria-label="Next category"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Category Dots */}
          <div className="flex gap-2">
            {sections.map((section, index) => (
              <button
                key={section.category}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-black w-8"
                    : "bg-black/20 w-2 hover:bg-black/40"
                }`}
                aria-label={`Go to ${section.category}`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative overflow-hidden">
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
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
                    {currentSection.category}
                  </p>
                  <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
                    {currentSection.category} Services
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                  {currentSection.services.map((service) => (
                    <Card key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
