"use client";

import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRef, useEffect } from "react";
import Link from "next/link";

export function CallToAction() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/background-video-3.mp4"
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Dark Overlay with Gradient */}

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-2 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-3 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 py-24 sm:py-32 md:py-40 md:px-8 min-h-[60vh]">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Let your plans shape the future.
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
            Start your free trial today. No credit card required.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild className="bg-white text-black hover:bg-gray-100">
            <Link href="/contact">
              Get Started
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
