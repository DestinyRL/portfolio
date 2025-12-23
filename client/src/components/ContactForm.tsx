import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useContactForm } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const { mutate, isPending } = useContactForm();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-4 sm:space-y-6 w-full max-w-md mx-auto px-4 sm:px-0"
    >
      <div className="space-y-2">
        <Input
          {...form.register("name")}
          placeholder="Your Name"
          data-testid="input-name"
          className="bg-card/30 border-white/10 h-11 sm:h-12 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm sm:text-base"
        />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive ml-1" data-testid="error-name">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...form.register("email")}
          type="email"
          placeholder="your@email.com"
          data-testid="input-email"
          className="bg-card/30 border-white/10 h-11 sm:h-12 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm sm:text-base"
        />
        {form.formState.errors.email && (
          <p className="text-xs text-destructive ml-1" data-testid="error-email">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          {...form.register("message")}
          placeholder="Tell me about your project..."
          data-testid="input-message"
          className="bg-card/30 border-white/10 min-h-[120px] sm:min-h-[150px] resize-none focus:border-primary/50 focus:ring-primary/20 transition-all text-sm sm:text-base"
        />
        {form.formState.errors.message && (
          <p className="text-xs text-destructive ml-1" data-testid="error-message">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isPending}
        data-testid="button-submit"
        className="w-full h-11 sm:h-12 bg-primary text-primary-foreground font-bold text-base sm:text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        ) : (
          <>
            Send Message <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
