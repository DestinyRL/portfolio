import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Code2, Database, Layout, Sparkles } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { SkillsSection } from "@/components/SkillsSection";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/30">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-2 px-4 sm:py-1 sm:px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-mono mb-4 sm:mb-6">
              Full Stack Engineer
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-display tracking-tight lg:tracking-tighter text-glow leading-tight lg:leading-[1.1]">
              CRAFTING DIGITAL <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x">
                REALITIES
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
          >
            I build immersive web experiences that merge creativity with engineering precision. 
            Specializing in React, Node.js, and WebGL.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce" />
        </motion.div>
      </section>

      {/* Skills Marquee (Optional Visual Breaker) */}
      <div className="w-full bg-card/50 border-y border-white/5 py-6 sm:py-8 overflow-hidden backdrop-blur-sm">
        <div className="flex gap-8 sm:gap-12 items-center justify-center opacity-50">
          <Code2 className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <Layout className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <Database className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-display">Projects</h2>
            <div className="h-1 w-16 sm:w-20 bg-primary rounded-full" />
          </motion.div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] bg-card/30 rounded-3xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {/* Fallback if no projects exist in DB yet - removes need for manual seed for visuals */}
            {!projects?.length && (
              <>
                <ProjectCard 
                  index={0}
                  project={{
                    id: 991,
                    title: "Neon Nexus",
                    description: "A futuristic dashboard visualization with real-time data streaming and WebGL charts.",
                    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000", /* cyber dashboard */
                    projectUrl: "#",
                    repoUrl: "#",
                    tags: ["React", "Three.js", "WebSocket"]
                  }} 
                />
                <ProjectCard 
                  index={1}
                  project={{
                    id: 992,
                    title: "Echo Commerce",
                    description: "Headless e-commerce platform built for speed and conversion with AI-powered recommendations.",
                    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000", /* abstract tech */
                    projectUrl: "#",
                    repoUrl: "#",
                    tags: ["Next.js", "Stripe", "PostgreSQL"]
                  }} 
                />
                <ProjectCard 
                  index={2}
                  project={{
                    id: 993,
                    title: "Neural Notes",
                    description: "Smart note-taking application that organizes your thoughts using natural language processing.",
                    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000", /* clean desk */
                    projectUrl: "#",
                    repoUrl: "#",
                    tags: ["TypeScript", "OpenAI", "Tailwind"]
                  }} 
                />
              </>
            )}
          </div>
        )}
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection skills={skills || []} isLoading={skillsLoading} />

      {/* Contact Info Section */}
      <ContactInfo />

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/50 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-display mb-4 sm:mb-6">Let's Create Together</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I'm currently open to new opportunities.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-white/5 text-center text-xs sm:text-sm text-muted-foreground font-mono px-4">
        <p>© {new Date().getFullYear()} Max. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}
