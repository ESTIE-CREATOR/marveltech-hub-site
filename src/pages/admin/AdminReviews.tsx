import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockReviews = [
  { id: 1, name: "John D.", rating: 5, text: "Amazing repair service! Fixed my laptop in 2 hours.", status: "pending" as const },
  { id: 2, name: "Lisa W.", rating: 4, text: "Good quality accessories at fair prices.", status: "pending" as const },
  { id: 3, name: "Mike R.", rating: 5, text: "Best tech repair shop in the city. Highly recommend!", status: "pending" as const },
  { id: 4, name: "Sarah M.", rating: 5, text: "They fixed my MacBook screen in under 3 hours!", status: "approved" as const },
  { id: 5, name: "James K.", rating: 5, text: "Bought a refurbished laptop — works like new.", status: "approved" as const },
];

type Status = "pending" | "approved" | "rejected";
const statusColors: Record<Status, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  approved: "bg-accent/10 text-accent",
  rejected: "bg-destructive/10 text-destructive",
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [filter, setFilter] = useState<"all" | Status>("all");

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const updateStatus = (id: number, status: Status) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Review ${status}`);
  };

  const deleteReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Review deleted");
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Reviews</h1>
        <p className="text-sm text-muted-foreground mb-6">Moderate customer reviews</p>

        <div className="flex gap-2 mb-4 flex-wrap">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && ` (${reviews.filter((r) => r.status === "pending").length})`}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm">{r.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < r.rating ? "fill-primary text-primary" : "text-border"}`} />
                    ))}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">"{r.text}"</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {r.status === "pending" && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-accent hover:text-accent" onClick={() => updateStatus(r.id, "approved")}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => updateStatus(r.id, "rejected")}>
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteReview(r.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminReviews;
