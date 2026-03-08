import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Wrench, Upload } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const deviceTypes = ["Laptop", "Phone", "Tablet", "Other"];
const brands = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Google", "Asus", "Other"];

const BookRepair = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", deviceType: "", deviceBrand: "", issue: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to book a repair");
      navigate("/login");
      return;
    }
    if (!form.name || !form.phone || !form.deviceType || !form.issue) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("repair_requests").insert({
      name: form.name,
      phone: form.phone,
      device_type: form.deviceType,
      brand: form.deviceBrand || "Other",
      issue: form.issue,
      user_id: user.id,
    });
    setLoading(false);
    if (error) {
      toast.error("Failed to submit: " + error.message);
    } else {
      toast.success("Repair request submitted! Track it from your dashboard.");
      setForm({ name: "", phone: "", deviceType: "", deviceBrand: "", issue: "" });
      navigate("/dashboard/repairs");
    }
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <section className="section-padding">
            <div className="container-wide max-w-md text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-3">Book a Repair</h1>
                <p className="text-muted-foreground mb-6">Sign in or create an account to submit a repair request and track its progress.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/login">Sign In / Sign Up</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

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

              <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Repair Request"}
              </Button>
              <div className="text-center">
                <Link to="/dashboard" className="text-sm text-primary hover:underline">
                  Go to Dashboard →
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
