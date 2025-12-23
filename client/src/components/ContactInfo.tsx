import { motion } from "framer-motion";
import { Linkedin, Github, Phone, MessageCircle } from "lucide-react";

export function ContactInfo() {
  const contacts = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "destiny-rl",
      url: "https://linkedin.com/in/destiny-rl",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "destinyrl",
      url: "https://github.com/destinyrl",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "09060981704",
      url: "tel:+2349060981704",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "09060981704",
      url: "https://wa.me/2349060981704",
    },
  ];

  return (
    <section id="contact-info" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-display">Get In Touch</h2>
          <div className="h-1 w-16 sm:w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {contacts.map((contact, idx) => (
            <motion.a
              key={contact.label}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              data-testid={`link-contact-${contact.label.toLowerCase()}`}
              className="group p-6 sm:p-8 bg-card/40 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:bg-card/60"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-primary transition-colors">
                  {contact.label}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors break-all">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
