import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="section-padding" style={{ background: "var(--hero-gradient)" }}>
    <div className="container-wide text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
          Got a Broken Device? Let's Fix It!
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
          Book a repair in minutes and get your device back fast. Free diagnostics included.
        </p>
        <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold shadow-lg" asChild>
          <Link to="/book-repair">
            Book a Repair Now <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
