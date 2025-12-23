import { motion } from "framer-motion";
import { Home, FolderGit2, Mail, User } from "lucide-react";

export function Navigation() {
  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "projects", icon: FolderGit2, label: "Work" },
    { id: "contact-info", icon: User, label: "Connect" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            data-testid={`nav-${item.id}`}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-card/50 border border-white/5 backdrop-blur-sm hover:border-primary/50 transition-all duration-200"
          >
            <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            
            <span className="absolute right-16 px-3 py-2 bg-card border border-white/10 rounded-md text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
            
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              layoutId="nav-glow"
            />
          </button>
        ))}
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden flex gap-2 sm:gap-3 bg-card/50 border border-white/5 backdrop-blur-sm rounded-full p-2 sm:p-3"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            data-testid={`mobile-nav-${item.id}`}
            title={item.label}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-primary/10 transition-colors"
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        ))}
      </motion.div>
    </>
  );
}
