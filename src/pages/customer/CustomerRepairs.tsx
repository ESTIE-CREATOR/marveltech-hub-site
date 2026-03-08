import CustomerLayout from "@/components/customer/CustomerLayout";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  in_progress: "bg-blue-500/10 text-blue-500",
  completed: "bg-green-500/10 text-green-500",
};

const CustomerRepairs = () => {
  const { user } = useAuth();

  const { data: repairs, isLoading } = useQuery({
    queryKey: ["my-repairs", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("repair_requests")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Repairs</h1>
        <p className="text-muted-foreground mb-6">Track all your repair requests.</p>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : !repairs?.length ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No repair requests yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {repairs.map((r) => (
              <div key={r.id} className="glass-card rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-primary font-mono">{r.id}</p>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[r.status] || statusColors.pending}`}>
                    {r.status.replace("_", " ")}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Device</p>
                    <p className="text-foreground">{r.device_type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Brand</p>
                    <p className="text-foreground">{r.brand}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Issue</p>
                    <p className="text-foreground truncate">{r.issue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="text-foreground">{format(new Date(r.created_at), "MMM d, yyyy")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </CustomerLayout>
  );
};

export default CustomerRepairs;
