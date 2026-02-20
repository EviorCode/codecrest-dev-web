import Link from "next/link";

import { SERVICES_DATA, getAllCategories } from "@/src/data/service.data";
import { ServicesPageHero } from "@/src/components/sections/services/ServicesPageHero";
import { ServicesGrid } from "@/src/components/sections/services/ServicesGrid";

const categories = getAllCategories();

const servicesByCategory = categories.map((category) => ({
  category,
  services: SERVICES_DATA.filter((service) => service.category === category),
}));

export default function ServicesPage() {
  return (
    <main className="min-h-screen  text-black">
      <ServicesPageHero />

      <ServicesGrid sections={servicesByCategory} />

      <section className="border-t border-white/10 bg-white/3 px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-black/60">
            Need a custom engagement?
          </p>
          <h3 className="text-3xl font-semibold sm:text-4xl">
            Let&apos;s architect the right solution together.
          </h3>
          <p className="max-w-3xl text-base text-black/70 sm:text-lg">
            From rapid product builds to enterprise-scale modernization, we plug
            in wherever you need senior operators. Share your goals and
            we&apos;ll recommend the exact service path.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
            >
              Talk to our team
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black/40"
            >
              See client work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
