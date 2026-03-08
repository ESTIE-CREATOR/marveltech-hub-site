import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const mockRepairs = [
  { id: "MTH-2024-015", name: "John Smith", phone: "+1 555-0101", device: "MacBook Pro", brand: "Apple", issue: "Screen flickering after drop", status: "in_progress" as const },
  { id: "MTH-2024-014", name: "Emily Davis", phone: "+1 555-0102", device: "iPhone 14", brand: "Apple", issue: "Battery drains fast", status: "pending" as const },
  { id: "MTH-2024-013", name: "Robert Lee", phone: "+1 555-0103", device: "Dell XPS 15", brand: "Dell", issue: "Keyboard not responding", status: "completed" as const },
  { id: "MTH-2024-012", name: "Maria Garcia", phone: "+1 555-0104", device: "Samsung S23", brand: "Samsung", issue: "Cracked screen", status: "in_progress" as const },
  { id: "MTH-2024-011", name: "Alex Thompson", phone: "+1 555-0105", device: "Lenovo ThinkPad", brand: "Lenovo", issue: "Won't turn on", status: "pending" as const },
];

type Status = "pending" | "in_progress" | "completed";
const statusConfig: Record<Status, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600" },
  in_progress: { label: "In Progress", color: "bg-primary/10 text-primary" },
  completed: { label: "Completed", color: "bg-accent/10 text-accent" },
};
const statusOrder: Status[] = ["pending", "in_progress", "completed"];

const AdminRepairs = () => {
  const [repairs, setRepairs] = useState(mockRepairs);
  const [filter, setFilter] = useState<"all" | Status>("all");

  const filtered = filter === "all" ? repairs : repairs.filter((r) => r.status === filter);

  const updateStatus = (id: string, newStatus: Status) => {
    setRepairs((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    toast.success(`Repair ${id} updated to ${statusConfig[newStatus].label}`);
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Repair Requests</h1>
        <p className="text-sm text-muted-foreground mb-6">Manage and update repair statuses</p>

        <div className="flex gap-2 mb-4 flex-wrap">
          {(["all", ...statusOrder] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f === "all" ? "All" : statusConfig[f].label}
            </Button>
          ))}
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Repair ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Device</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Issue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-foreground">{r.id}</td>
                    <td className="py-3 px-4">
                      <div className="text-foreground font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-foreground">{r.device}</div>
                      <div className="text-xs text-muted-foreground">{r.brand}</div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground max-w-[200px] truncate">{r.issue}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[r.status].color}`}>
                        {statusConfig[r.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value as Status)}
                        className="h-8 px-2 rounded-md border border-input bg-background text-foreground text-xs"
                      >
                        {statusOrder.map((s) => (
                          <option key={s} value={s}>{statusConfig[s].label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminRepairs;
