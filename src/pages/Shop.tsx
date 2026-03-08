import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

import imgLaptopDell from "@/assets/products/laptop-dell.jpg";
import imgLaptopHp from "@/assets/products/laptop-hp.jpg";
import imgLaptopLenovo from "@/assets/products/laptop-lenovo.jpg";
import imgPhoneIphone from "@/assets/products/phone-iphone.jpg";
import imgPhoneSamsung from "@/assets/products/phone-samsung.jpg";
import imgPhonePixel from "@/assets/products/phone-pixel.jpg";
import imgHeadphones from "@/assets/products/headphones.jpg";
import imgEarbuds from "@/assets/products/earbuds.jpg";
import imgChargerUsbc from "@/assets/products/charger-usbc.jpg";
import imgChargerMacbook from "@/assets/products/charger-macbook.jpg";
import imgLaptopStand from "@/assets/products/laptop-stand.jpg";
import imgUsbHub from "@/assets/products/usb-hub.jpg";

const allProducts = [
  { id: 1, name: "Dell Latitude 5520", category: "Laptops", price: 499, tag: "Refurbished", image: imgLaptopDell },
  { id: 2, name: "iPhone 13 – 128GB", category: "Phones", price: 399, tag: "Pre-owned", image: imgPhoneIphone },
  { id: 3, name: "Sony WH-1000XM5", category: "Accessories", price: 249, tag: "New", image: imgHeadphones },
  { id: 4, name: "65W USB-C Charger", category: "Chargers", price: 29, tag: "New", image: imgChargerUsbc },
  { id: 5, name: "HP EliteBook 840 G8", category: "Laptops", price: 549, tag: "Refurbished", image: imgLaptopHp },
  { id: 6, name: "Samsung Galaxy S23", category: "Phones", price: 449, tag: "Pre-owned", image: imgPhoneSamsung },
  { id: 7, name: "AirPods Pro 2", category: "Accessories", price: 199, tag: "New", image: imgEarbuds },
  { id: 8, name: "MacBook Pro Charger", category: "Chargers", price: 49, tag: "New", image: imgChargerMacbook },
  { id: 9, name: "Lenovo ThinkPad X1", category: "Laptops", price: 699, tag: "Refurbished", image: imgLaptopLenovo },
  { id: 10, name: "Google Pixel 8", category: "Phones", price: 379, tag: "New", image: imgPhonePixel },
  { id: 11, name: "Laptop Stand – Aluminum", category: "Accessories", price: 39, tag: "New", image: imgLaptopStand },
  { id: 12, name: "USB-C Hub 7-in-1", category: "Accessories", price: 35, tag: "New", image: imgUsbHub },
];

const categories = ["All", "Laptops", "Phones", "Accessories", "Chargers"];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "newest">("newest");

  const filtered = allProducts
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.id - a.id;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">Shop Devices</h1>
              <p className="text-muted-foreground text-lg">Quality laptops, phones, and accessories at unbeatable prices.</p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((c) => (
                  <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)}>
                    {c}
                  </Button>
                ))}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </motion.div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="glass-card rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="aspect-square bg-secondary relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{p.category}</p>
                    <h3 className="font-display font-semibold text-foreground mt-1 text-sm">{p.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-bold text-primary text-lg">${p.price}</span>
                      <Button variant="hero" size="sm" onClick={() => {
                        if (!user) {
                          toast.error("Please sign in to add to cart");
                          navigate("/login");
                        } else {
                          toast.success("Added to cart!");
                        }
                      }}>Add to Cart</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Shop;
