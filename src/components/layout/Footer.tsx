import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pb-20 md:pb-0">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-heading font-bold text-sm text-accent-foreground">AR</div>
              <span className="font-heading text-lg font-bold">AR Computer</span>
            </div>
            <p className="text-sm text-background/60 mb-4">Your one-stop destination for computers, phones, and electronic accessories at the best prices.</p>
            <div className="flex gap-3">
              {["Facebook", "Twitter", "Instagram", "YouTube"].map(s => (
                <span key={s} className="text-xs text-background/50 hover:text-accent cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
              <li><Link to="/deals" className="hover:text-accent transition-colors">Deals</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm text-background/60">
              {categories.slice(0, 6).map(c => (
                <li key={c.id}><Link to={`/category/${c.slug}`} className="hover:text-accent transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><span className="text-background/40">support@arcomputer.com</span></li>
              <li><span className="text-background/40">+91 1800-123-4567</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-6 text-center text-xs text-background/40">
          © 2026 AR Computer Electronics Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
