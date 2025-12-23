import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="group relative h-96 sm:h-[450px] lg:h-[500px] w-full bg-card/40 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500"
      data-testid={`card-project-${project.id}`}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-4 sm:p-6 lg:p-8 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 flex-shrink-0"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display mb-2 text-white group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 font-light">
            {project.description}
          </p>

          <div className="flex gap-4">
            {project.projectUrl && (
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-project-demo-${project.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-primary transition-colors"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-primary/10 to-transparent" />
    </motion.div>
  );
}
