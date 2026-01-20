"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { COMPANY_LINKEDIN_URL } from "@/src/lib/constants/contact";

const leadershipMembers = [
  {
    name: "Talha Majeed",
    designation: "Senior Business Developer",
    imageSrc: "/team/talha-majeed.jpeg",
    linkedIn: COMPANY_LINKEDIN_URL,
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

export default function AboutLeadership() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(leadershipMembers.length / itemsPerSlide);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const currentMembers = leadershipMembers.slice(
    currentIndex * itemsPerSlide,
    currentIndex * itemsPerSlide + itemsPerSlide
  );

  return (
    <section className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium tracking-[0.3em] text-white/40 uppercase mb-3">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Creative Minds
            </h2>
          </div>
          <p className="text-white/60 md:max-w-md">
            Talented individuals working together to create exceptional experiences and deliver outstanding results.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all"
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
                    ? "bg-white w-8"
                    : "bg-white/30 w-2 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Team Members Carousel */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMembers.map((member) => (
                  <div
                    key={member.name}
                    className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all">
                          <img
                            src={member.imageSrc}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-white/50 mb-4">
                        {member.designation}
                      </p>

                      {/* LinkedIn */}
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
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
