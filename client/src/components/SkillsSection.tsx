import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

interface SkillsSectionProps {
  skills: Skill[];
  isLoading?: boolean;
}

export function SkillsSection({ skills, isLoading }: SkillsSectionProps) {
  const defaultSkills: Skill[] = [
    {
      id: 1,
      category: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js", "Vue.js"]
    },
    {
      id: 2,
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Python", "FastAPI"]
    },
    {
      id: 3,
      category: "Web3 & Blockchain",
      items: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "Blockchain"]
    },
    {
      id: 4,
      category: "Tools & Deployment",
      items: ["Git", "Docker", "AWS", "Vercel", "Render", "CI/CD"]
    }
  ];

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  return (
    <section id="skills" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-display">Skills & Expertise</h2>
          <div className="h-1 w-16 sm:w-20 bg-primary rounded-full" />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-card/30 rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {displaySkills.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="p-6 sm:p-8 bg-card/40 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors duration-300"
                data-testid={`skills-group-${skillGroup.category}`}
              >
                <h3 className="text-xl sm:text-2xl font-bold font-display mb-4 sm:mb-6 text-primary">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skillGroup.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs sm:text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
                      data-testid={`skill-${skill}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
