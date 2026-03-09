import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById, getProductsByCategory } from "@/data/products";
import { getCategoryBySlug, categories } from "@/data/categories";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, ShoppingCart, Star, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw, GitCompareArrows } from "lucide-react";
import ProductShareButtons from "@/components/ProductShareButtons";
import ProductCard from "@/components/ProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductReviewForm from "@/components/ProductReviewForm";
import EMICalculator from "@/components/EMICalculator";
import ProductQA from "@/components/ProductQA";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import ProductComparison from "@/components/ProductComparison";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useCompare } from "@/hooks/useCompare";
import { useUserReviews } from "@/hooks/useUserReviews";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = id ? getProductById(id) : null;
  const [quantity, setQuantity] = useState(1);
  const [variantPriceAdj, setVariantPriceAdj] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "qa">("specs");
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addViewed } = useRecentlyViewed();
  const { compareList, addToCompare, removeFromCompare, clearCompare, showCompare, setShowCompare } = useCompare();
  const { addReview, getReviews } = useUserReviews();

  useEffect(() => {
    if (id) addViewed(id);
  }, [id, addViewed]);

  if (!product) {
    return <div className="container py-16 text-center"><h1 className="text-2xl font-bold">Product not found</h1><Link to="/shop" className="text-primary hover:underline mt-2 inline-block">Back to shop</Link></div>;
  }

  const wishlisted = isInWishlist(product.id);
  const discount = product.discountPrice ? Math.round((1 - product.discountPrice / product.price) * 100) : 0;
  const cat = categories.find(c => c.id === product.category);
  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const userReviews = getReviews(product.id);
  const allReviews = [...userReviews, ...product.reviews];
  const effectivePrice = (product.discountPrice || product.price) + variantPriceAdj;

  // Generate variants based on category
  const getVariants = () => {
    const variants: { label: string; options: string[]; priceModifiers?: Record<string, number> }[] = [];
    const cat = product.category;
    if (cat === "phones" || cat === "tablets") {
      variants.push({ label: "Storage", options: ["128GB", "256GB", "512GB", "1TB"], priceModifiers: { "128GB": 0, "256GB": 5000, "512GB": 15000, "1TB": 30000 } });
      variants.push({ label: "Color", options: ["Black", "White", "Blue", "Silver"] });
    } else if (cat === "computers") {
      variants.push({ label: "RAM", options: ["8GB", "16GB", "32GB"], priceModifiers: { "8GB": 0, "16GB": 8000, "32GB": 20000 } });
      variants.push({ label: "Storage", options: ["256GB SSD", "512GB SSD", "1TB SSD"], priceModifiers: { "256GB SSD": 0, "512GB SSD": 4000, "1TB SSD": 10000 } });
    } else if (cat === "audio") {
      variants.push({ label: "Color", options: ["Black", "White", "Silver", "Blue"] });
    } else if (cat === "components") {
      // no variants
    } else {
      variants.push({ label: "Color", options: ["Black", "White"] });
    }
    return variants;
  };
  const variants = getVariants();

  const handleVariantChange = (selections: Record<string, string>) => {
    let adj = 0;
    variants.forEach(v => {
      if (v.priceModifiers && selections[v.label]) {
        adj += v.priceModifiers[selections[v.label]] || 0;
      }
    });
    setVariantPriceAdj(adj);
  };

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        {cat && <><Link to={`/category/${cat.slug}`} className="hover:text-primary">{cat.name}</Link><ChevronRight className="w-3 h-3" /></>}
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ProductImageGallery images={product.images} name={product.name} discount={discount} />

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
          <h1 className="font-heading text-xl md:text-2xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-success text-success-foreground rounded px-2 py-1">
              <Star className="w-3.5 h-3.5" fill="currentColor" />
              <span className="text-sm font-bold">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{allReviews.length} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold font-heading">₹{effectivePrice.toLocaleString()}</span>
            {product.discountPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
                <span className="text-sm font-bold text-success">Save ₹{(product.price - product.discountPrice).toLocaleString()}</span>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <ProductVariantSelector variants={variants} onVariantChange={handleVariantChange} />
          )}

          {/* EMI Calculator */}
          <EMICalculator price={effectivePrice} />

          {/* Share */}
          <div className="flex items-center justify-between my-4">
            <ProductShareButtons productName={product.name} productUrl={window.location.href} price={effectivePrice} />
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 my-6">
            <span className="text-sm font-medium">Qty:</span>
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
            <span className="text-xs text-muted-foreground">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`p-3 rounded-lg border transition-colors ${wishlisted ? "bg-destructive text-destructive-foreground border-destructive" : "border-border hover:bg-secondary"}`}
            >
              <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => addToCompare(product)}
              className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
              title="Compare"
            >
              <GitCompareArrows className="w-5 h-5" />
            </button>
          </div>

          {/* Compare bar */}
          {compareList.length >= 2 && (
            <button onClick={() => setShowCompare(true)} className="w-full text-sm bg-accent text-accent-foreground py-2 rounded-lg font-medium mb-4 hover:opacity-90">
              Compare {compareList.length} Products
            </button>
          )}

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: "Free Delivery" },
              { icon: Shield, text: "1 Year Warranty" },
              { icon: RotateCcw, text: "7-Day Returns" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1 bg-secondary rounded-lg py-3 px-2">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-muted-foreground text-center">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b border-border mb-6">
          <button onClick={() => setActiveTab("specs")} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>Specifications</button>
          <button onClick={() => setActiveTab("reviews")} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>Reviews ({allReviews.length})</button>
          <button onClick={() => setActiveTab("qa")} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "qa" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>Q&A</button>
        </div>

        {activeTab === "specs" && (
          <div className="grid sm:grid-cols-2 gap-2">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between bg-secondary rounded-lg px-4 py-2.5">
                <span className="text-sm text-muted-foreground">{key}</span>
                <span className="text-sm font-medium">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="space-y-4">
              {allReviews.map(r => (
                <div key={r.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{r.userName}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-accent" fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
            <ProductReviewForm productId={product.id} onSubmit={(review) => addReview(product.id, review)} />
          </div>
        )}

        {activeTab === "qa" && (
          <ProductQA productId={product.id} />
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading text-xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && <ProductComparison products={compareList} onRemove={removeFromCompare} onClear={clearCompare} />}
    </div>
  );
}
