import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Heart, Zap } from "lucide-react";

const team = [
  { name: "David Chen", role: "Founder & Lead Technician", initial: "DC" },
  { name: "Amara Johnson", role: "Phone Repair Specialist", initial: "AJ" },
  { name: "Marcus Williams", role: "Laptop Repair Expert", initial: "MW" },
  { name: "Sofia Rodriguez", role: "Customer Relations", initial: "SR" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container-wide text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
              Our Story
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Founded in 2018, MarvelTechHub4U started with a simple mission: make quality tech repair accessible and affordable for everyone. What began as a small workshop has grown into a trusted repair center serving thousands of happy customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="glass-card rounded-xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide fast, reliable, and affordable tech repair services while delivering an exceptional customer experience. We believe everyone deserves access to professional device care without breaking the bank.
            </p>
          </motion.div>

          <motion.div
            className="glass-card rounded-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted tech repair and gadget sales hub, known for our expertise, integrity, and commitment to sustainability through device repair rather than replacement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.h2
            className="font-display text-3xl font-bold text-foreground text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Drives Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Customer First", desc: "Every decision starts with how it benefits our customers." },
              { icon: Award, title: "Quality Parts", desc: "We only use genuine and OEM-quality replacement parts." },
              { icon: Zap, title: "Fast Service", desc: "Most repairs completed same-day or within 24 hours." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Team</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">Meet Our Experts</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                className="glass-card rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-primary">{t.initial}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default About;
