import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, label: "Projects Completed", suffix: "+" },
  { value: 5, label: "Years Experience", suffix: "" },
  { value: 100, label: "Happy Clients", suffix: "%" },
  { value: 99, label: "Code Quality", suffix: "%" },
];

export function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const intervals = stats.map((stat, idx) => {
      const increment = stat.value / 50;
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[idx] < stat.value) {
            updated[idx] = Math.min(updated[idx] + increment, stat.value);
          }
          return updated;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={hasStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative p-8 rounded-2xl bg-card/40 border border-white/5 overflow-hidden group hover:border-primary/30 transition-colors"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                  {Math.floor(counts[idx])}{stat.suffix}
                </div>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
