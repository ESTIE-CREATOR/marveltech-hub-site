import { motion } from "framer-motion";
import { ShieldCheck, Clock, DollarSign, Award } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Certified Technicians", desc: "Our team holds industry certifications for all major brands." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Transparent quotes with no hidden fees — guaranteed." },
  { icon: Clock, title: "Fast Turnaround", desc: "Most repairs completed within 24–48 hours." },
  { icon: Award, title: "Warranty Included", desc: "90-day warranty on all parts and repairs." },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-card">
    <div className="container-wide">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-sm font-medium text-primary uppercase tracking-wider">Why Us</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Why Choose MarvelTechHub4U
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <r.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
