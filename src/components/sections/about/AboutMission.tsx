"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const operatingTenets = [
  {
    label: "01",
    title: "Full-stack delivery teams",
    copy: "Strategy, design, AI, and engineering sit under one lead to shorten feedback loops.",
  },
  {
    label: "02",
    title: "System-level thinking",
    copy: "We map dependencies across data, infra, policy, and customer touch points before we build.",
  },
  {
    label: "03",
    title: "Momentum rituals",
    copy: "Every engagement runs on 6-week program increments with measurable lifts.",
  },
  {
    label: "04",
    title: "Client-first partnerships",
    copy: "We embed with your teams, not just deliver to them. Your success metrics become our success metrics.",
  },
  {
    label: "05",
    title: "Continuous innovation",
    copy: "We invest in R&D and emerging technologies to ensure our clients stay ahead of market shifts.",
  },
];

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

export default function AboutMission() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Show 2 items at a time on desktop, 1 on mobile
  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(operatingTenets.length / itemsPerSlide);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const currentItems = operatingTenets.slice(
    currentIndex * itemsPerSlide,
    currentIndex * itemsPerSlide + itemsPerSlide
  );

  return (
    <section className="bg-white text-black py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold tracking-[0.4em] text-gray-500 uppercase">
            Mission & Approach
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 max-w-2xl">
              We combine deep systems expertise with rapid product delivery
              rituals.
            </h2>
            <p className="text-gray-600 md:max-w-md">
              Every engagement blends discovery, architecture, and build tracks
              so we can navigate regulation without sacrificing velocity.
            </p>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-indigo-500 w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
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
              <div className="grid gap-6 md:grid-cols-2">
                {currentItems.map((tenet) => (
                  <div
                    key={tenet.label}
                    className="border border-gray-200 rounded-xl p-6 space-y-4 bg-white"
                  >
                    <span className="text-sm font-semibold text-indigo-500">
                      {tenet.label}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {tenet.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{tenet.copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
