import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { motion } from "framer-motion";
import { Monitor, Smartphone, ScreenShare, Battery, Cpu, HardDrive, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Monitor,
    title: "Laptop Repair",
    desc: "From motherboard failures to keyboard replacements, we handle all laptop brands including Dell, HP, Lenovo, Apple MacBook, and more.",
    price: "From $49",
    features: ["Motherboard repair", "Keyboard replacement", "Hinge repair", "Fan cleaning"],
  },
  {
    icon: Smartphone,
    title: "Phone Repair",
    desc: "Cracked screens, charging issues, water damage — we restore your phone to like-new condition with genuine parts.",
    price: "From $29",
    features: ["Screen repair", "Charging port fix", "Water damage recovery", "Speaker repair"],
  },
  {
    icon: ScreenShare,
    title: "Screen Replacement",
    desc: "OEM-quality LCD and OLED screens for all major phone and laptop brands. Same-day service available.",
    price: "From $39",
    features: ["LCD replacement", "OLED replacement", "Touch digitizer", "Laptop display"],
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    desc: "Restore your device's battery life with genuine replacement batteries and professional installation.",
    price: "From $25",
    features: ["Phone batteries", "Laptop batteries", "Tablet batteries", "Battery diagnostics"],
  },
  {
    icon: Cpu,
    title: "Software Troubleshooting",
    desc: "OS reinstalls, virus removal, data recovery, and performance optimization for all devices.",
    price: "From $35",
    features: ["OS reinstall", "Virus removal", "Data recovery", "Performance tuning"],
  },
  {
    icon: HardDrive,
    title: "Device Upgrades",
    desc: "Boost your device with RAM, SSD, and storage upgrades. We'll help you pick the best upgrade path.",
    price: "From $45",
    features: ["RAM upgrade", "SSD upgrade", "Storage expansion", "GPU upgrade"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container-wide text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Services</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
              Expert Repair & Upgrade Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Professional repairs for all major brands with certified technicians, genuine parts, and a 90-day warranty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((s) => (
              <motion.div key={s.title} variants={item} className="glass-card rounded-xl p-6 flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{s.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {s.features.map((f) => (
                    <li key={f} className="text-sm text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-display font-bold text-primary text-lg">{s.price}</span>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/book-repair">Book Now</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: "var(--hero-gradient)" }}>
        <div className="container-wide text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Need a Repair? We've Got You Covered
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg max-w-xl mx-auto">
              Free diagnostics on all devices. Most repairs completed within 24 hours.
            </p>
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold" asChild>
              <Link to="/book-repair">Book a Repair <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Services;
