import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Search, CheckCircle2, Clock, Loader2, Package } from "lucide-react";

type Status = "pending" | "in_progress" | "completed" | null;

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-500", bg: "bg-yellow-500/10", desc: "Your device has been received and is in the queue." },
  in_progress: { icon: Loader2, label: "In Progress", color: "text-primary", bg: "bg-primary/10", desc: "Our technicians are currently working on your device." },
  completed: { icon: CheckCircle2, label: "Completed", color: "text-accent", bg: "bg-accent/10", desc: "Your repair is done! Pick up your device or we'll deliver it." },
};

const TrackRepair = () => {
  const [repairId, setRepairId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repairId || !phone) {
      toast.error("Please enter both Repair ID and Phone Number");
      return;
    }
    // Mock lookup — in production this would query Supabase
    setSearched(true);
    const mockStatuses: Status[] = ["pending", "in_progress", "completed"];
    setStatus(mockStatuses[Math.floor(Math.random() * 3)]);
  };

  const cfg = status ? statusConfig[status] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-wide max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">Track Your Repair</h1>
              <p className="text-muted-foreground text-lg">Enter your Repair ID and phone number to check the status.</p>
            </motion.div>

            <motion.form
              onSubmit={handleTrack}
              className="glass-card rounded-xl p-6 sm:p-8 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-2">
                <Label htmlFor="repairId">Repair ID</Label>
                <Input id="repairId" placeholder="e.g. MTH-2024-001" value={repairId} onChange={(e) => setRepairId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button variant="hero" size="lg" className="w-full" type="submit">
                <Search className="w-4 h-4" /> Track Repair
              </Button>
            </motion.form>

            {searched && cfg && (
              <motion.div
                className="glass-card rounded-xl p-6 sm:p-8 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${cfg.bg} flex items-center justify-center mx-auto mb-4`}>
                    <cfg.icon className={`w-8 h-8 ${cfg.color}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{cfg.label}</h3>
                  <p className="text-muted-foreground">{cfg.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                    Repair ID: <span className="font-mono text-foreground">{repairId}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TrackRepair;
