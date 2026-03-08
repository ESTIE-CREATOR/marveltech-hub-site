import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Package, Star, Wrench, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
  { icon: Package, label: "Total Products", value: "48", change: "+3 this week", color: "text-primary" },
  { icon: Star, label: "Pending Reviews", value: "7", change: "Needs approval", color: "text-yellow-500" },
  { icon: Wrench, label: "Repair Requests", value: "23", change: "5 in progress", color: "text-accent" },
  { icon: Users, label: "Admin Users", value: "4", change: "All active", color: "text-primary" },
];

const recentRepairs = [
  { id: "MTH-2024-015", device: "MacBook Pro", issue: "Screen flickering", status: "In Progress" },
  { id: "MTH-2024-014", device: "iPhone 14", issue: "Battery drain", status: "Pending" },
  { id: "MTH-2024-013", device: "Dell XPS 15", issue: "Keyboard not working", status: "Completed" },
  { id: "MTH-2024-012", device: "Samsung S23", issue: "Cracked screen", status: "In Progress" },
];

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-500/10 text-yellow-600",
  "In Progress": "bg-primary/10 text-primary",
  "Completed": "bg-accent/10 text-accent",
};

const AdminOverview = () => (
  <AdminLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Dashboard Overview</h1>
      <p className="text-muted-foreground text-sm mb-8">Welcome back! Here's what's happening today.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <p className="text-xs text-accent mt-0.5">{s.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Repairs */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Recent Repair Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-medium text-muted-foreground">Repair ID</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Device</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Issue</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRepairs.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-mono text-foreground">{r.id}</td>
                  <td className="py-3 text-foreground">{r.device}</td>
                  <td className="py-3 text-muted-foreground">{r.issue}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
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

export default AdminOverview;
