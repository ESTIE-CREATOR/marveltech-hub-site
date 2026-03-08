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
import { Star, MessageSquare } from "lucide-react";

const approvedReviews = [
  { name: "Sarah M.", rating: 5, text: "They fixed my MacBook screen in under 3 hours! Incredible service.", date: "2 weeks ago" },
  { name: "James K.", rating: 5, text: "Bought a refurbished laptop here — works like new. MarvelTechHub4U is my go-to.", date: "1 month ago" },
  { name: "Priya D.", rating: 5, text: "Professional, honest, and fast. Diagnosed my phone issue for free.", date: "1 month ago" },
  { name: "Alex T.", rating: 4, text: "Great prices on accessories. Shipping was fast too.", date: "2 months ago" },
  { name: "Maria L.", rating: 5, text: "Battery replacement on my iPhone was done in 30 minutes. Amazing!", date: "2 months ago" },
];

const Reviews = () => {
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Review submitted! It will appear after admin approval.");
      setForm({ name: "", rating: 5, text: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">Customer Reviews</h1>
              <p className="text-muted-foreground text-lg">See what our customers say about us</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Reviews list */}
              <div className="lg:col-span-2 space-y-4">
                {approvedReviews.map((r, i) => (
                  <motion.div
                    key={i}
                    className="glass-card rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{r.name}</h4>
                          <p className="text-xs text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "fill-primary text-primary" : "text-border"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">"{r.text}"</p>
                  </motion.div>
                ))}
              </div>

              {/* Submit form */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="glass-card rounded-xl p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-foreground">Leave a Review</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Your Name</Label>
                      <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} type="button" onClick={() => setForm((p) => ({ ...p, rating: n }))}>
                            <Star className={`w-6 h-6 cursor-pointer transition-colors ${n <= form.rating ? "fill-primary text-primary" : "text-border hover:text-primary/50"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Your Review</Label>
                      <Textarea placeholder="Share your experience..." rows={4} value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} />
                    </div>
                    <Button variant="hero" className="w-full" type="submit" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">Reviews are published after admin approval.</p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Reviews;
