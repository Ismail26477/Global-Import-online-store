import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Headphones, Star, ChevronRight, ChevronLeft, Mail } from "lucide-react";
import { getFeaturedProducts, getTrendingProducts, getDiscountedProducts } from "@/data/products";
import RecentlyViewed from "@/components/RecentlyViewed";
import BrandsShowcase from "@/components/BrandsShowcase";
import NewArrivalsCountdown from "@/components/NewArrivalsCountdown";
import NotificationBanner from "@/components/NotificationBanner";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const heroSlides = [
  {
    image: heroBanner,
    badge: "🔥 Grand Electronics Sale",
    title: <>Next-Gen Tech<br /><span className="text-accent">Best Prices.</span></>,
    desc: "Discover the latest computers, smartphones, and gadgets at unbeatable prices. Free shipping on orders above ₹999.",
    cta: { text: "Shop Now", to: "/shop" },
    cta2: { text: "View Deals", to: "/deals" },
  },
  {
    image: heroSlide2,
    badge: "📱 Big Tech Sale",
    title: <>Smartphones & Laptops<br /><span className="text-accent">Up to 40% Off</span></>,
    desc: "Grab the latest smartphones and laptops from top brands at incredible discounts.",
    cta: { text: "Browse Phones", to: "/category/phones" },
    cta2: { text: "Browse Laptops", to: "/category/computers" },
  },
  {
    image: heroSlide3,
    badge: "🎮 Gaming Deals",
    title: <>Gaming Gear<br /><span className="text-accent">Level Up!</span></>,
    desc: "Premium gaming accessories at unbeatable prices. Keyboards, headsets, controllers and more.",
    cta: { text: "Shop Gaming", to: "/category/gaming" },
    cta2: { text: "All Deals", to: "/deals" },
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const trending = getTrendingProducts().slice(0, 8);
  const deals = getDiscountedProducts().slice(0, 6);
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { toast.success("Subscribed successfully!"); setEmail(""); }
  };

  

  return (
    <div>
      {/* Hero Slider - horizontal slide */}
      <section className="relative overflow-hidden">
        <div className="relative w-full" style={{ height: "clamp(200px, 40vw, 400px)" }}>
          <motion.div
            className="flex absolute inset-0"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          >
            {heroSlides.map((s, i) => (
              <div key={i} className="relative w-full shrink-0 h-full">
                <img src={s.image} alt="Hero banner" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
                <div className="container relative h-full flex items-center">
                  <div className="max-w-xl py-6">
                    <span className="inline-block bg-accent text-accent-foreground text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full mb-3">{s.badge}</span>
                    <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 leading-tight text-primary-foreground">
                      {s.title}
                    </h1>
                    <p className="text-primary-foreground/80 mb-4 text-xs md:text-sm max-w-md line-clamp-2">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link to={s.cta.to} className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-heading font-semibold text-xs md:text-sm hover:opacity-90 transition-opacity">
                        {s.cta.text} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link to={s.cta2.to} className="inline-flex items-center gap-1.5 border border-primary-foreground/30 text-primary-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-heading font-semibold text-xs md:text-sm hover:bg-primary-foreground/10 transition-colors">
                        {s.cta2.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slider controls */}
        <div className="absolute bottom-3 right-4 md:bottom-6 md:right-8 flex items-center gap-2 z-10">
          <button onClick={prevSlide} className="w-7 h-7 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 flex items-center justify-center text-primary-foreground transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex gap-1">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "bg-accent w-5" : "bg-primary-foreground/40 w-1.5"}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="w-7 h-7 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 flex items-center justify-center text-primary-foreground transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border bg-card">
        <div className="container py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Truck, text: "Free Delivery", sub: "On orders above ₹999" },
              { icon: Shield, text: "Secure Payment", sub: "100% protected" },
              { icon: Headphones, text: "24/7 Support", sub: "Dedicated help" },
              { icon: Star, text: "Best Quality", sub: "Genuine products" },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold">{text}</p>
                  <p className="text-[9px] text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-6 md:py-10 bg-secondary/50">
        <div className="container">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg md:text-xl font-bold">Featured Products</h2>
            <Link to="/shop" className="text-primary text-sm flex items-center gap-1 hover:underline">See All <ChevronRight className="w-4 h-4" /></Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Deals Banner */}
      <section className="py-6 md:py-10">
        <div className="container">
          <motion.div {...fadeUp} className="bg-gradient-to-r from-destructive to-accent rounded-2xl p-5 md:p-8 text-center">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-primary-foreground mb-1.5">⚡ Flash Deals</h2>
            <p className="text-primary-foreground/80 text-xs mb-3">Up to 40% off on top electronics. Limited time only!</p>
            <Link to="/deals" className="inline-flex items-center gap-2 bg-card text-foreground px-5 py-2 rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
              Shop Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals with Countdown */}
      <NewArrivalsCountdown />

      <section className="py-6 md:py-10 bg-secondary/50">
        <div className="container">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg md:text-xl font-bold">Trending Now 🔥</h2>
            <Link to="/shop?filter=trending" className="text-primary text-sm flex items-center gap-1 hover:underline">See All <ChevronRight className="w-4 h-4" /></Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsShowcase />

      {/* Discounted Products */}
      {deals.length > 0 && (
        <section className="py-6 md:py-10">
          <div className="container">
            <motion.div {...fadeUp} className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg md:text-xl font-bold">Today's Deals</h2>
              <Link to="/deals" className="text-primary text-sm flex items-center gap-1 hover:underline">All Deals <ChevronRight className="w-4 h-4" /></Link>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {deals.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Notification Toasts */}
      <NotificationBanner />

      {/* Newsletter */}
      <section className="py-6 md:py-10">
        <div className="container">
          <motion.div {...fadeUp} className="bg-primary rounded-2xl p-5 md:p-8 text-center text-primary-foreground">
            <Mail className="w-8 h-8 mx-auto mb-3 text-accent" />
            <h2 className="font-heading text-lg md:text-xl font-bold mb-1">Stay Updated</h2>
            <p className="text-primary-foreground/70 text-xs mb-4 max-w-md mx-auto">Subscribe to get exclusive deals, new arrivals, and tech tips.</p>
            <form onSubmit={handleNewsletter} className="flex max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-sm text-foreground bg-card border-0 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="bg-accent text-accent-foreground px-4 py-2 rounded-r-lg font-medium text-sm hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}