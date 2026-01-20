"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

const culturePillars = [
  {
    eyebrow: "Clarity",
    title: "Operate with Clarity",
    description:
      "Translate complex platform decisions into succinct narratives and measurable outcomes.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    className:
      "sm:col-span-2 max-lg:rounded-t-2xl sm:max-lg:rounded-t-3xl lg:col-span-3 lg:rounded-tl-4xl",
    fade: [] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Accountability",
    title: "Ship with Accountability",
    description:
      "Every initiative has an owner, a runbook, and an explicit definition of success.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    className: "sm:col-span-2 lg:col-span-3 lg:rounded-tr-4xl",
    fade: [] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Scale",
    title: "Design for Scale",
    description:
      "Bias toward resilient systems that scale across markets, teams, and regulatory surfaces.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    className: "sm:col-span-1 lg:col-span-2 lg:rounded-bl-4xl",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Customers",
    title: "Stay Close to Customers",
    description:
      "Weekly customer reviews keep research, design, and delivery tightly aligned.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    className:
      "sm:col-span-2 max-lg:rounded-b-2xl sm:max-lg:rounded-b-3xl lg:col-span-4 lg:rounded-br-4xl",
    fade: ["top"] as ("top" | "bottom")[],
  },
];

function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-black dark:bg-transparent transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)]  shadow-sm ring-1 ring-white/10",
        "data-dark:bg-gray-800 data-dark:ring-white/15"
      )}
    >
      <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-linear-to-b from-white to-50%  group-data-dark:from-[-25%] opacity-25" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-linear-to-t from-white to-50%  group-data-dark:from-[-25%] opacity-25" />
        )}
      </div>
      <div className="relative p-4 sm:p-5 md:p-6 z-20 isolate mt-[-60px] sm:mt-[-70px] md:mt-[-80px] min-h-[100px] sm:min-h-[110px] md:min-h-[120px] backdrop-blur-xl text-white">
        <h1 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/60">
          {eyebrow}
        </h1>
        <p className="mt-1 text-base sm:text-lg md:text-xl font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-xs sm:text-sm leading-relaxed text-white/70 dark:text-white/60 ">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutCulture() {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 container mx-auto w-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
      <h1 className="font-heading font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl text-black">
        Culture
      </h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-lg font-medium tracking-tight mt-2 text-black/50">
        Principles that shape every engagement.
      </p>
      <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-6 lg:grid-rows-2">
        {culturePillars.map((pillar) => (
          <BentoCard
            key={pillar.title}
            eyebrow={pillar.eyebrow}
            title={pillar.title}
            description={pillar.description}
            graphic={
              <div className="absolute inset-0">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            }
            className={pillar.className}
            fade={pillar.fade}
          />
        ))}
      </div>
    </section>
  );
}
