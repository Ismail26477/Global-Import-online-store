import { Truck, Users, Shield, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl font-bold mb-4">About AR Computer</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          AR Computer Electronics Store is India's leading destination for computers, mobile phones, and electronic accessories. Founded in 2020, we've served over 100,000 happy customers with genuine products at the best prices.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Same-day and next-day delivery in 500+ cities across India." },
            { icon: Shield, title: "Genuine Products", desc: "100% authentic products sourced directly from authorized distributors." },
            { icon: Users, title: "100K+ Customers", desc: "Trusted by over 100,000 customers and growing every day." },
            { icon: Award, title: "Award Winning", desc: "Recognized as the Best Electronics Retailer 2025 by TechAwards India." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-xl p-6">
              <Icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          To make cutting-edge technology accessible and affordable for everyone in India. We believe that technology can transform lives, and we're committed to bringing the latest gadgets at the most competitive prices with world-class service.
        </p>

        <h2 className="font-heading text-2xl font-bold mb-4">Why Choose AR Computer?</h2>
        <ul className="space-y-2 text-muted-foreground">
          {["Widest range of electronics across 13+ categories", "Price match guarantee - find it cheaper, we'll match it", "Easy 7-day returns and 1-year warranty on all products", "24/7 customer support via chat, email, and phone", "Secure payments with multiple payment options", "EMI options available on purchases above ₹5,000"].map(item => (
            <li key={item} className="flex items-start gap-2"><span className="text-primary mt-1">✓</span>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
