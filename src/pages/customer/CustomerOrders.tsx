import CustomerLayout from "@/components/customer/CustomerLayout";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-destructive/10 text-destructive",
};

const CustomerOrders = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*, products(name, image_url))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Orders</h1>
        <p className="text-muted-foreground mb-6">Track your purchase history.</p>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : !orders?.length ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="glass-card rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(order.created_at), "MMM d, yyyy")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-bold text-foreground">₦{Number(order.total).toLocaleString()}</span>
                  </div>
                </div>
                {order.order_items?.length > 0 && (
                  <div className="border-t border-border pt-3 space-y-2">
                    {order.order_items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 text-sm">
                        {item.products?.image_url && (
                          <img src={item.products.image_url} alt="" className="w-10 h-10 rounded-md object-cover" />
                        )}
                        <span className="text-foreground flex-1">{item.products?.name || "Product"}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                        <span className="text-foreground font-medium">₦{Number(item.price).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </CustomerLayout>
  );
};

export default CustomerOrders;
