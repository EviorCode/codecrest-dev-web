"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { getAllBlogs } from "@/src/data/blog.data";

const blogs = getAllBlogs();

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function BlogsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentBlogs = blogs.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  if (!blogs.length) {
    return null;
  }

  return (
    <section className="w-full bg-[#050505] py-20 text-white sm:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-purple-400">
              Insights & Resources
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Latest Articles
            </h2>
            <p className="text-base text-white/60 max-w-xl">
              Field notes, playbooks, and shipping logs from the Codecrest team.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
              aria-label="Previous articles"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
              aria-label="Next articles"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Blog Cards Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-purple-600/90 text-xs font-medium uppercase tracking-wider rounded-full">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-white/50 mb-4">
                        <span>
                          {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span>{blog.readTimeMinutes} min read</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold tracking-tight mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-white/60 line-clamp-3 mb-4 flex-1">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs text-white/50 bg-white/5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors mt-auto">
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-purple-500"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
