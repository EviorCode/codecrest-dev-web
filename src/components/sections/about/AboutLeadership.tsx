"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

type TeamMember = {
  name: string;
  designation: string;
  imageSrc: string;
  category: string;
  linkedIn?: string;
};

const allMembers: TeamMember[] = [
  // C Level
  {
    name: "Hassaan Imran",
    designation: "CEO and Founder",
    category: "C Level",
    imageSrc: "/team/hassan-imran.jpeg",
    linkedIn: "https://www.linkedin.com/in/hassnain-imran-36b4a4244/",
  },
  // Manager Level
  {
    name: "Afshaar Ahmed",
    designation: "Technical Manager",
    category: "Manager",
    imageSrc: "/team/afshar-ahmed.jpeg",
  },
  {
    name: "Muhammad Rizwan",
    designation: "Manager",
    category: "Manager",
    imageSrc: "/team/muhammad-rizwan.jpeg",
  },
  // Our Team
  {
    name: "Talha Majeed",
    designation: "Senior Business Developer",
    category: "Our Team",
    imageSrc: "/team/talha-majeed.jpeg",
  },
  {
    name: "Usman Khan",
    designation: "Laravel Developer",
    category: "Our Team",
    imageSrc: "/team/usman-khan.jpeg",
  },
  {
    name: "Mr Ahmed",
    designation: "Flutter Developer",
    category: "Our Team",
    imageSrc: "/team/mr-ahmed.jpeg",
  },
  {
    name: "Nadia Nawaz",
    designation: "UI/UX Designer",
    category: "Our Team",
    imageSrc: "/team/nadia-nawaz.jpeg",
  },
  {
    name: "Saleh Ahmed",
    designation: "Junior Flutter Developer",
    category: "Our Team",
    imageSrc: "/team/saleh-ahmed.jpeg",
  },
  {
    name: "Hanzla",
    designation: "Full Stack Developer",
    category: "Our Team",
    imageSrc: "/team/hanzla.jpeg",
  },
  {
    name: "Mr Imran",
    designation: ".Net Developer",
    category: "Our Team",
    imageSrc: "/team/mr-imran.jpeg",
  },
];

const cLevelMembers = allMembers.filter((m) => m.category === "C Level");
const managerMembers = allMembers.filter((m) => m.category === "Manager");
const ourTeamMembers = allMembers.filter((m) => m.category === "Our Team");

// Duplicate the array multiple times to ensure seamless infinite looping on ultra-wide screens
const duplicatedOurTeam = [
  ...ourTeamMembers,
  ...ourTeamMembers,
  ...ourTeamMembers,
  ...ourTeamMembers,
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="w-64 sm:w-72 md:w-80 group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shrink-0">
      <div className="flex flex-col items-center text-center h-full">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all bg-white/5 mx-auto">
            <img
              src={member.imageSrc}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member.name
                )}&background=random&color=fff`;
              }}
            />
          </div>
        </div>

        {/* Info */}
        <span className="mb-2 px-3 py-1 text-xs font-semibold text-white/80 border border-white/10 bg-white/5 rounded-full uppercase tracking-wider">
          {member.category}
        </span>

        <h4 className="text-lg font-semibold text-white mb-1 mt-2">
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
    </div>
  );
}

export default function AboutLeadership() {
  return (
    <section className="bg-[#050505] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
      </div>

      <div className="flex flex-col gap-12 md:gap-16 w-full">
        {/* Layer 1: C Level */}
        <div className="flex justify-center px-6">
          {cLevelMembers.map((member, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={idx}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>

        {/* Layer 2: Managers */}
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {managerMembers.map((member, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>

        {/* Layer 3: Our Team Marquee */}
        <div className="relative w-full overflow-hidden min-w-[200vw] mt-4">
          {/* Gradient fades on the edges to smooth out the entry/exit */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40, // Adjust this value to control speed
              repeat: Infinity,
            }}
          >
            {duplicatedOurTeam.map((member, idx) => (
              <TeamCard key={`${member.name}-${idx}`} member={member} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
