import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => (
  <section className="section-padding bg-card">
    <div className="container-wide">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-sm font-medium text-primary uppercase tracking-wider">Get In Touch</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Visit Us or Reach Out
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567" },
          { icon: Mail, title: "Email", info: "hello@marveltechhub4u.com" },
          { icon: MapPin, title: "Location", info: "123 Tech St, Innovation City" },
          { icon: Clock, title: "Hours", info: "Mon–Sat: 9am – 7pm" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            className="glass-card rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.info}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
