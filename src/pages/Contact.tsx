import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">Contact Us</h1>
              <p className="text-muted-foreground text-lg">We'd love to hear from you. Reach out anytime!</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", info: "+1 (555) 123-4567", sub: "Mon–Sat, 9am–7pm" },
                  { icon: Mail, title: "Email", info: "hello@marveltechhub4u.com", sub: "We reply within 24 hours" },
                  { icon: MapPin, title: "Location", info: "123 Tech Street, Innovation City", sub: "Walk-ins welcome" },
                  { icon: Clock, title: "Business Hours", info: "Mon–Sat: 9:00 AM – 7:00 PM", sub: "Sunday: Closed" },
                ].map((c, i) => (
                  <div key={c.title} className="glass-card rounded-xl p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{c.title}</h3>
                      <p className="text-foreground text-sm">{c.info}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  </div>
                ))}

                {/* Map placeholder */}
                <div className="glass-card rounded-xl overflow-hidden h-48">
                  <iframe
                    title="MarvelTechHub4U Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991517034!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1678900000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="glass-card rounded-xl p-6 sm:p-8 space-y-5 h-fit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" /> Send a Message
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input placeholder="Your name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="How can we help?" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Message *</Label>
                  <Textarea placeholder="Tell us more..." rows={5} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
                </div>
                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
