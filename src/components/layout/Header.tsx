import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";

import iconComputers from "@/assets/icon-computers.png";
import iconComponents from "@/assets/icon-components.png";
import iconPhones from "@/assets/icon-phones.png";
import iconTablets from "@/assets/icon-tablets.png";
import iconMobileAcc from "@/assets/icon-mobile-acc.png";
import iconComputerAcc from "@/assets/icon-computer-acc.png";
import iconStorage from "@/assets/icon-storage.png";
import iconAudio from "@/assets/icon-audio.png";
import iconNetworking from "@/assets/icon-networking.png";
import iconGaming from "@/assets/icon-gaming.png";
import iconPrinters from "@/assets/icon-printers.png";
import iconSmartGadgets from "@/assets/icon-smart-gadgets.png";
import iconCables from "@/assets/icon-cables.png";
import iconDeals from "@/assets/icon-deals.png";

const categoryIconMap: Record<string, string> = {
  computers: iconComputers,
  components: iconComponents,
  phones: iconPhones,
  tablets: iconTablets,
  "mobile-accessories": iconMobileAcc,
  "computer-accessories": iconComputerAcc,
  storage: iconStorage,
  audio: iconAudio,
  networking: iconNetworking,
  gaming: iconGaming,
  printers: iconPrinters,
  "smart-gadgets": iconSmartGadgets,
  cables: iconCables,
};

const categoryShortNames: Record<string, string> = {
  computers: "Computers",
  components: "Parts",
  phones: "Phones",
  tablets: "Tablets",
  "mobile-accessories": "Mob Acc",
  "computer-accessories": "PC Acc",
  storage: "Storage",
  audio: "Audio",
  networking: "Network",
  gaming: "Gaming",
  printers: "Printers",
  "smart-gadgets": "Gadgets",
  cables: "Cables",
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg transition-all duration-300">
      {/* Top bar: Logo + Name left, Cart right - hides on scroll */}
      <div
        className={`container flex items-center justify-between gap-2 transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 py-0 opacity-0" : "max-h-20 py-2.5 opacity-100"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-heading font-bold text-sm text-accent-foreground">AR</div>
          <span className="font-heading text-lg font-bold text-primary-foreground">AR Computer</span>
        </Link>

        <div className="flex items-center">
          <ThemeToggle />
          <Link to="/cart" className="relative p-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] h-5 w-5 flex items-center justify-center p-0 rounded-full border-0">{totalItems}</Badge>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar - clicking navigates to search page */}
      <div className="container pb-2.5 pt-1">
        <button
          onClick={() => navigate("/search")}
          className="flex items-center w-full bg-card rounded-lg overflow-hidden text-left"
        >
          <Search className="w-4 h-4 ml-3 text-muted-foreground shrink-0" />
          <span className="flex-1 px-3 py-2.5 text-sm text-muted-foreground">
            Search for products, brands...
          </span>
        </button>
      </div>

      {/* Category icon strip */}
      <div className="bg-primary/90 border-t border-primary-foreground/10">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-center py-2 px-2" style={{ minWidth: "max-content" }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-1 px-2.5 sm:px-4 min-w-[56px] sm:min-w-[72px] group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <img
                    src={categoryIconMap[cat.id]}
                    alt={cat.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9px] sm:text-[11px] text-primary-foreground/90 group-hover:text-primary-foreground whitespace-nowrap truncate max-w-[52px] sm:max-w-[68px] text-center leading-tight">
                  {categoryShortNames[cat.id] || cat.name}
                </span>
              </Link>
            ))}
            <Link
              to="/deals"
              className="flex flex-col items-center gap-1 px-2.5 sm:px-4 min-w-[56px] sm:min-w-[72px] group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <img src={iconDeals} alt="Deals" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" loading="lazy" />
              </div>
              <span className="text-[9px] sm:text-[11px] text-accent font-bold whitespace-nowrap text-center leading-tight">Deals</span>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}