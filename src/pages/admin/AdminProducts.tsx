import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

const mockProducts = [
  { id: 1, name: "Dell Latitude 5520", category: "Laptops", price: 499, stock: 5 },
  { id: 2, name: "iPhone 13 – 128GB", category: "Phones", price: 399, stock: 8 },
  { id: 3, name: "Sony WH-1000XM5", category: "Accessories", price: 249, stock: 12 },
  { id: 4, name: "65W USB-C Charger", category: "Chargers", price: 29, stock: 30 },
  { id: 5, name: "HP EliteBook 840 G8", category: "Laptops", price: 549, stock: 3 },
  { id: 6, name: "Samsung Galaxy S23", category: "Phones", price: 449, stock: 6 },
];

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(mockProducts);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground">Manage your product inventory</p>
          </div>
          <Button variant="hero" size="sm">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>

        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" /> {p.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{p.category}</td>
                    <td className="py-3 px-4 text-foreground font-medium">${p.price}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.stock > 5 ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-600"}`}>
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
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

export default AdminProducts;
