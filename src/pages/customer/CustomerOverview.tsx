import CustomerLayout from "@/components/customer/CustomerLayout";
import { motion } from "framer-motion";
import { ShoppingBag, Wrench, Star, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const CustomerOverview = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: orders } = useQuery({
    queryKey: ["orders-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const { data: repairs } = useQuery({
    queryKey: ["repairs-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("repair_requests")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const stats = [
    { icon: ShoppingBag, label: "My Orders", value: orders ?? 0, to: "/dashboard/orders", color: "text-primary" },
    { icon: Wrench, label: "My Repairs", value: repairs ?? 0, to: "/dashboard/repairs", color: "text-accent" },
  ];

  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">
          Welcome back, {profile?.full_name || user?.email?.split("@")[0] || "Customer"}!
        </h1>
        <p className="text-muted-foreground mb-6">Here's your account overview.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {stats.map((s) => (
            <Link key={s.label} to={s.to} className="glass-card rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/book-repair" className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-foreground">
              <Wrench className="w-4 h-4 text-primary" /> Book a Repair
            </Link>
            <Link to="/shop" className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-foreground">
              <ShoppingBag className="w-4 h-4 text-primary" /> Browse Shop
            </Link>
            <Link to="/dashboard/profile" className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-foreground">
              <User className="w-4 h-4 text-primary" /> Edit Profile
            </Link>
          </div>
        </div>
      </motion.div>
    </CustomerLayout>
  );
};

export default CustomerOverview;
