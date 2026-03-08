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
import { Wrench, Upload } from "lucide-react";

const deviceTypes = ["Laptop", "Phone", "Tablet", "Other"];
const brands = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Google", "Asus", "Other"];

const BookRepair = () => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", deviceType: "", deviceBrand: "", issue: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.deviceType || !form.issue) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Repair request submitted! We'll contact you shortly.");
      setForm({ name: "", phone: "", email: "", deviceType: "", deviceBrand: "", issue: "" });
    }, 1500);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">Book a Repair</h1>
              <p className="text-muted-foreground text-lg">Submit your repair request and we'll get back to you within an hour.</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-6 sm:p-8 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="John Doe" value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Device Type *</Label>
                  <select
                    value={form.deviceType}
                    onChange={(e) => update("deviceType", e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                  >
                    <option value="">Select device</option>
                    {deviceTypes.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Device Brand</Label>
                  <select
                    value={form.deviceBrand}
                    onChange={(e) => update("deviceBrand", e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                  >
                    <option value="">Select brand</option>
                    {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue">Problem Description *</Label>
                <Textarea id="issue" placeholder="Describe the issue with your device..." rows={4} value={form.issue} onChange={(e) => update("issue", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Upload Image (optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Repair Request"}
              </Button>
              <div className="text-center">
                <Link to="/login" className="text-sm text-primary hover:underline">
                  Sign in to track your repairs from your dashboard →
                </Link>
              </div>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BookRepair;
