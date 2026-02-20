"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { COMPANY_LINKEDIN_URL } from "@/src/lib/constants/contact";

type TeamMember = {
  name: string;
  designation: string;
  imageSrc: string;
  linkedIn?: string;
};

type TeamCategory = {
  category: string;
  members: TeamMember[];
};

const teamCategories: TeamCategory[] = [
  {
    category: "C Level",
    members: [
      {
        name: "Hassaan Imran",
        designation: "CEO and Founder",
        imageSrc: "/team/hassan-imran.jpeg",
        linkedIn: "https://www.linkedin.com/in/hassnain-imran-36b4a4244/",
      },
    ],
  },
  {
    category: "Manager Level",
    members: [
      {
        name: "Afshaar Ahmed",
        designation: "Technical Manager",
        imageSrc: "/team/afshar-ahmed.jpeg",
      },
      {
        name: "Muhammad Rizwan",
        designation: "Business Development Manager",
        imageSrc: "/team/placeholder.png", // Using a placeholder since image is missing
      },
    ],
  },
  {
    category: "Our Team",
    members: [
      {
        name: "Talha Majeed",
        designation: "Senior Business Developer",
        imageSrc: "/team/talha-majeed.jpeg",
      },
      {
        name: "Usman Khan",
        designation: "Laravel Developer",
        imageSrc: "/team/usman-khan.jpeg",
      },
      {
        name: "Mr Ahmed",
        designation: "Flutter Developer",
        imageSrc: "/team/mr-ahmed.jpeg",
      },
      {
        name: "Nadia Nawaz",
        designation: "UI/UX Designer",
        imageSrc: "/team/nadia-nawaz.jpeg",
      },
      {
        name: "Saleh Ahmed",
        designation: "Junior Flutter Developer",
        imageSrc: "/team/saleh-ahmed.jpeg",
      },
      {
        name: "Hanzla",
        designation: "Full Stack Developer",
        imageSrc: "/team/hanzla.jpeg",
      },
      {
        name: "Mr Imran",
        designation: ".Net Developer",
        imageSrc: "/team/mr-imran.jpeg",
      },
    ],
  },
];

export default function AboutLeadership() {
  return (
    <section className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
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

        {/* Categories */}
        <div className="space-y-20">
          {teamCategories.map((group, groupIndex) => (
            <div key={group.category}>
              <h3 className="text-2xl font-semibold text-white mb-8 border-b border-white/10 pb-4 inline-block">
                {group.category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member, idx) => (
                  <motion.div
                    key={`${member.name}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all bg-white/5">
                          <img
                            src={member.imageSrc}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback if image not found (like Manager)
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`;
                            }}
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {member.name}
                      </h4>
                      <p className="text-sm text-white/50 mb-4 h-10 flex items-center justify-center">
                        {member.designation}
                      </p>

                      {/* LinkedIn */}
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all mt-auto"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
