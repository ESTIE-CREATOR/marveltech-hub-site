import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, Smartphone, Headphones, BatteryCharging } from "lucide-react";

const products = [
  { icon: Laptop, name: "Dell Latitude 5520", category: "Laptops", price: "$499", tag: "Refurbished" },
  { icon: Smartphone, name: "iPhone 13 – 128GB", category: "Phones", price: "$399", tag: "Pre-owned" },
  { icon: Headphones, name: "Sony WH-1000XM5", category: "Accessories", price: "$249", tag: "New" },
  { icon: BatteryCharging, name: "65W USB-C Charger", category: "Chargers", price: "$29", tag: "New" },
];

const FeaturedProducts = () => (
  <section className="section-padding bg-card">
    <div className="container-wide">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Shop</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Featured Products
          </h2>
        </div>
        <Button variant="outline" asChild>
          <Link to="/shop">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            className="glass-card rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="aspect-square bg-secondary flex items-center justify-center relative">
              <p.icon className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                {p.tag}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{p.category}</p>
              <h3 className="font-display font-semibold text-foreground mt-1 text-sm">{p.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="font-display font-bold text-primary text-lg">{p.price}</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/shop">View</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
