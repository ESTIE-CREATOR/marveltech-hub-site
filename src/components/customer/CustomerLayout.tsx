import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Wrench, User, LogOut, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/orders", icon: ShoppingBag, label: "My Orders" },
  { to: "/dashboard/repairs", icon: Wrench, label: "My Repairs" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
];

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`${collapsed ? "w-16" : "w-60"} bg-card border-r border-border flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="h-16 flex items-center justify-between px-3 border-b border-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sm text-foreground">MTH4U</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border space-y-1">
          {!collapsed && (
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              {user?.email}
            </div>
          )}
          <div className="flex justify-center">{!collapsed && <ThemeToggle />}</div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
};

export default CustomerLayout;
