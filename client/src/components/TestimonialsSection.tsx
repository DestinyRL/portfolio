import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "CEO, TechStartup",
    content: "Exceptional talent! Built our entire Web3 platform from scratch. Delivered on time with production-grade code.",
    rating: 5,
  },
  {
    name: "Chioma Okonkwo",
    role: "Product Manager, FinTech Co",
    content: "Outstanding work on our crypto price tracker. The UI/UX is smooth and the backend is bulletproof.",
    rating: 5,
  },
  {
    name: "Adebayo Okafor",
    role: "Founder, Finest Steel",
    content: "Transformed our business with a professional e-commerce platform. Highly recommended for any project.",
    rating: 5,
  },
  {
    name: "Jennifer Chen",
    role: "Tech Lead, Global Enterprise",
    content: "Incredibly skilled in full-stack development. Great communication and problem-solving abilities.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-20 space-y-4"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-display">What People Say</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      <div className="relative h-[400px] md:h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-8 md:p-12 bg-card/40 rounded-3xl border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-foreground mb-6 font-light leading-relaxed">
                "{testimonials[current].content}"
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-primary">{testimonials[current].name}</h3>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-card/50 border border-white/5 hover:border-primary/50 transition-colors"
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full bg-card/50 border border-white/5 hover:border-primary/50 transition-colors"
            data-testid="button-testimonial-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-primary" : "bg-white/20"
              }`}
              data-testid={`button-testimonial-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
