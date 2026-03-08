import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "They fixed my MacBook screen in under 3 hours! Incredible service and very affordable." },
  { name: "James K.", rating: 5, text: "Bought a refurbished laptop here — works like new. MarvelTechHub4U is my go-to shop now." },
  { name: "Priya D.", rating: 5, text: "Professional, honest, and fast. They diagnosed my phone issue for free and repaired it same-day." },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-sm font-medium text-primary uppercase tracking-wider">Testimonials</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          What Our Customers Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
            <p className="text-sm font-semibold text-foreground">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
