import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Trash2, Shield, User } from "lucide-react";
import { toast } from "sonner";

const mockUsers = [
  { id: 1, email: "admin@marveltechhub4u.com", role: "admin", name: "David Chen" },
  { id: 2, email: "amara@marveltechhub4u.com", role: "admin", name: "Amara Johnson" },
  { id: 3, email: "marcus@marveltechhub4u.com", role: "admin", name: "Marcus Williams" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleDelete = (id: number) => {
    if (users.length <= 1) {
      toast.error("Cannot delete the last admin");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("Admin removed");
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground">Manage admin accounts</p>
          </div>
          <Button variant="hero" size="sm">
            <Plus className="w-4 h-4" /> Add Admin
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <div key={u.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{u.name}</h3>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(u.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary capitalize">{u.role}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUsers;
