import { motion } from "framer-motion";
import { Monitor, Smartphone, ScreenShare, Battery, Cpu, HardDrive } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Monitor, title: "Laptop Repair", desc: "Motherboard, keyboard, display and hardware fixes." },
  { icon: Smartphone, title: "Phone Repair", desc: "Cracked screens, charging ports, water damage recovery." },
  { icon: ScreenShare, title: "Screen Replacement", desc: "OEM-quality screens for all major brands." },
  { icon: Battery, title: "Battery Replacement", desc: "Genuine batteries to restore full power." },
  { icon: Cpu, title: "Software Troubleshooting", desc: "OS reinstalls, virus removal, performance tuning." },
  { icon: HardDrive, title: "Device Upgrades", desc: "RAM, SSD, and storage upgrades for speed." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Services</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          What We Fix & Upgrade
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          From simple screen replacements to complex hardware repairs — we handle it all with expertise and care.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={item}>
            <Link
              to="/services"
              className="block glass-card rounded-xl p-6 hover:shadow-glow transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
