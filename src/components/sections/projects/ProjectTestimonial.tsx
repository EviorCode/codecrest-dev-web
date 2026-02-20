"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface ProjectTestimonialProps {
  testimonial?: Testimonial;
  testimonials?: Testimonial[];
}

export default function ProjectTestimonial({
  testimonial,
  testimonials,
}: ProjectTestimonialProps) {
  const reviews = testimonials?.length
    ? testimonials
    : testimonial
      ? [testimonial]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext, reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 20 : -20,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 20 : -20,
    }),
  };

  return (
    <section className="bg-[#050505] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Client Reviews
          </h2>
        </div>

        {/* Review Carousel */}
        <div className="relative">
          {/* Navigation */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Review Card */}
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full"
              >
                <div className="border border-white/10 rounded-lg p-8 md:p-10">
                  {/* Quote */}
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                    "{currentReview.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 font-medium">
                      {currentReview.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {currentReview.author}
                      </p>
                      <p className="text-white/50 text-sm">
                        {currentReview.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-6"
                      : "bg-white/30 w-1.5 hover:bg-white/50"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}