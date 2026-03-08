import { Link } from "react-router-dom";
import { Smartphone, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container-wide section-padding !py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Marvel<span className="text-primary">TechHub</span>4U
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your trusted partner for fast, reliable laptop and phone repairs, plus quality devices and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Services", "Shop", "Book Repair", "Track Repair", "About"].map((l) => (
              <li key={l}>
                <Link
                  to={`/${l.toLowerCase().replace(/ /g, "-")}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Laptop Repair</li>
            <li>Phone Repair</li>
            <li>Screen Replacement</li>
            <li>Battery Replacement</li>
            <li>Software Troubleshooting</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              hello@marveltechhub4u.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              123 Tech Street, Innovation City
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MarvelTechHub4U. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
