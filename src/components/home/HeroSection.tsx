import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import heroImg from "@/assets/hero-repair.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="Tech repair workspace" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,25%,8%)]/95 via-[hsl(220,25%,8%)]/75 to-[hsl(220,25%,8%)]/40" />
    </div>

    <div className="relative container-wide section-padding !pt-28 !pb-20">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/30">
            ⚡ Trusted by 5,000+ customers
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{ color: "hsl(0 0% 100%)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Fast & Reliable{" "}
          <span className="gradient-text">Laptop and Phone</span>{" "}
          Repairs
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-8 leading-relaxed"
          style={{ color: "hsl(0 0% 85%)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Expert technicians, genuine parts, and unbeatable prices. Get your devices fixed or shop the latest gadgets — all in one place.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/book-repair">
              Book Repair <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="hero-outline" size="lg" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link to="/shop">
              <ShoppingBag className="w-4 h-4" /> Shop Devices
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { num: "5K+", label: "Happy Customers" },
            { num: "24hr", label: "Avg. Turnaround" },
            { num: "98%", label: "Satisfaction Rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-bold text-primary-foreground">{s.num}</div>
              <div className="text-sm" style={{ color: "hsl(0 0% 70%)" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
