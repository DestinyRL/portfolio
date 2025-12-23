import { motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@shared/schema";

interface ProjectFilterProps {
  projects: Project[];
  onFilter: (filtered: Project[]) => void;
}

export function ProjectFilter({ projects, onFilter }: ProjectFilterProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get all unique technologies
  const allTechs = [...new Set(projects.flatMap((p) => p.tags))].sort();

  const handleFilter = (tech: string | null) => {
    setSelectedTech(tech);
    if (tech === null) {
      onFilter(projects);
    } else {
      onFilter(projects.filter((p) => p.tags.includes(tech)));
    }
  };

  return (
    <div className="mb-12 flex flex-wrap gap-3 items-center justify-center">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={() => handleFilter(null)}
        className={`px-6 py-2 rounded-full font-medium transition-all text-sm ${
          selectedTech === null
            ? "bg-primary text-white"
            : "bg-card/40 text-muted-foreground border border-white/5 hover:border-primary/30"
        }`}
        data-testid="button-filter-all"
      >
        All
      </motion.button>
      {allTechs.map((tech, idx) => (
        <motion.button
          key={tech}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => handleFilter(tech)}
          className={`px-6 py-2 rounded-full font-medium transition-all text-sm ${
            selectedTech === tech
              ? "bg-primary text-white"
              : "bg-card/40 text-muted-foreground border border-white/5 hover:border-primary/30"
          }`}
          data-testid={`button-filter-${tech}`}
        >
          {tech}
        </motion.button>
      ))}
    </div>
  );
}
