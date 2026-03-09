export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice?: number;
  stock: number;
  brand: string;
  rating: number;
  reviewCount: number;
  images: string[];
  specs: Record<string, string>;
  reviews: ProductReview[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
}

const brands = {
  laptops: ["Dell", "HP", "Lenovo", "ASUS", "Acer", "Apple", "MSI"],
  phones: ["Samsung", "Apple", "OnePlus", "Xiaomi", "Realme", "Oppo", "Vivo", "Google"],
  audio: ["Sony", "JBL", "Bose", "Sennheiser", "boAt", "Skullcandy"],
  components: ["AMD", "Intel", "NVIDIA", "Corsair", "Kingston", "Western Digital", "Samsung", "Gigabyte", "ASUS"],
  accessories: ["Logitech", "Razer", "SteelSeries", "HyperX", "Anker", "Belkin"],
  smart: ["Apple", "Samsung", "Fitbit", "Garmin", "Amazfit", "Noise"],
  networking: ["TP-Link", "Netgear", "D-Link", "ASUS"],
  printers: ["HP", "Canon", "Epson", "Brother"],
  storage: ["Samsung", "SanDisk", "Western Digital", "Seagate", "Kingston"],
};

const reviewNames = ["Rahul S.", "Priya M.", "Ankit K.", "Sneha R.", "Vikram P.", "Neha T.", "Arjun D.", "Kavya L.", "Raj B.", "Meera G."];
const reviewComments = [
  "Excellent product! Works perfectly as described.",
  "Great value for money. Highly recommended!",
  "Good quality, fast delivery. Satisfied with the purchase.",
  "Decent product for the price. Could be better.",
  "Amazing build quality and performance!",
  "Exceeded my expectations. Will buy again.",
  "Works well but packaging could be improved.",
  "Perfect for daily use. Very happy with it.",
  "Solid product, no complaints whatsoever.",
  "Best in this price range. Love it!",
];

function generateReviews(count: number): ProductReview[] {
  const reviews: ProductReview[] = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `rev-${Math.random().toString(36).substr(2, 9)}`,
      userName: reviewNames[Math.floor(Math.random() * reviewNames.length)],
      rating: Math.floor(Math.random() * 2) + 4,
      comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
      date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    });
  }
  return reviews;
}

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;

  const p = (name: string, cat: string, sub: string, price: number, brand: string, img: string, specs: Record<string, string>, flags: Partial<Pick<Product, "isFeatured" | "isTrending" | "isBestSeller" | "isNewArrival">> = {}, discountPct?: number) => {
    const discountPrice = discountPct ? Math.round(price * (1 - discountPct / 100)) : undefined;
    products.push({
      id: `prod-${id++}`,
      name,
      description: `${name} - High quality ${sub.replace(/-/g, " ")} from ${brand}. Designed for performance, reliability and great user experience. Perfect for professionals and enthusiasts alike.`,
      category: cat,
      subcategory: sub,
      price,
      discountPrice,
      stock: Math.floor(Math.random() * 100) + 5,
      brand,
      rating: +(3.5 + Math.random() * 1.5).toFixed(1),
      reviewCount: Math.floor(Math.random() * 500) + 10,
      images: [img],
      specs,
      reviews: generateReviews(Math.floor(Math.random() * 5) + 2),
      ...flags,
    });
  };

  // COMPUTERS - Laptops
  p("Dell Inspiron 15 3520", "computers", "laptops", 45999, "Dell", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", { Processor: "Intel i5-1235U", RAM: "8GB DDR4", Storage: "512GB SSD", Display: "15.6\" FHD" }, { isBestSeller: true }, 10);
  p("HP Pavilion 14", "computers", "laptops", 52999, "HP", "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop", { Processor: "Intel i5-1340P", RAM: "16GB DDR4", Storage: "512GB SSD", Display: "14\" FHD IPS" }, { isFeatured: true }, 15);
  p("Lenovo IdeaPad Slim 5", "computers", "laptops", 58999, "Lenovo", "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop", { Processor: "AMD Ryzen 5 7530U", RAM: "16GB DDR5", Storage: "512GB SSD", Display: "14\" 2.2K IPS" }, { isTrending: true });
  p("ASUS VivoBook 15", "computers", "laptops", 39999, "ASUS", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop", { Processor: "Intel i3-1215U", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6\" FHD" }, {}, 20);
  p("MacBook Air M2", "computers", "laptops", 114900, "Apple", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", { Processor: "Apple M2", RAM: "8GB Unified", Storage: "256GB SSD", Display: "13.6\" Liquid Retina" }, { isFeatured: true, isBestSeller: true });
  p("MSI GF63 Thin", "computers", "laptops", 54990, "MSI", "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop", { Processor: "Intel i5-12450H", RAM: "8GB DDR4", Storage: "512GB SSD", GPU: "RTX 2050" }, { isTrending: true }, 12);
  p("Acer Aspire 3", "computers", "laptops", 32999, "Acer", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop", { Processor: "AMD Ryzen 3 7320U", RAM: "8GB", Storage: "256GB SSD", Display: "15.6\" FHD" }, {});
  p("Lenovo ThinkPad E14", "computers", "laptops", 67999, "Lenovo", "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400&h=400&fit=crop", { Processor: "Intel i5-1335U", RAM: "16GB DDR4", Storage: "512GB SSD", Display: "14\" FHD IPS" }, { isNewArrival: true });

  // COMPUTERS - Desktops
  p("HP All-in-One 24", "computers", "all-in-one", 62999, "HP", "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=400&fit=crop", { Processor: "Intel i5-1335U", RAM: "8GB", Storage: "512GB SSD", Display: "23.8\" FHD" }, { isFeatured: true }, 8);
  p("Dell OptiPlex 3000", "computers", "desktop-pcs", 42999, "Dell", "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop", { Processor: "Intel i5-12500", RAM: "8GB", Storage: "256GB SSD", Form: "Small Form Factor" }, {});
  p("Custom Gaming PC RTX 4060", "computers", "gaming-pcs", 89999, "Custom", "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop", { Processor: "Intel i5-13400F", RAM: "16GB DDR5", Storage: "1TB SSD", GPU: "RTX 4060" }, { isTrending: true, isFeatured: true }, 10);
  p("Intel NUC 12 Pro", "computers", "mini-pcs", 38999, "Intel", "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop", { Processor: "Intel i5-1240P", RAM: "16GB", Storage: "512GB SSD", Form: "Ultra Compact" }, { isNewArrival: true });

  // COMPONENTS
  p("AMD Ryzen 5 5600X", "components", "cpu", 12999, "AMD", "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop", { Cores: "6", Threads: "12", "Base Clock": "3.7 GHz", "Boost Clock": "4.6 GHz" }, { isBestSeller: true }, 15);
  p("Intel Core i7-13700K", "components", "cpu", 32999, "Intel", "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop", { Cores: "16", Threads: "24", "Base Clock": "3.4 GHz", "Boost Clock": "5.4 GHz" }, { isTrending: true });
  p("NVIDIA RTX 4070 Super", "components", "graphics-cards", 52999, "NVIDIA", "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop", { Memory: "12GB GDDR6X", "Core Clock": "2475 MHz", "Power": "220W", Interface: "PCIe 4.0" }, { isFeatured: true, isBestSeller: true });
  p("Corsair Vengeance 16GB DDR5", "components", "ram", 4999, "Corsair", "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop", { Capacity: "16GB (2x8GB)", Speed: "5600MHz", Type: "DDR5", CAS: "36" }, { isBestSeller: true }, 10);
  p("Samsung 990 Pro 1TB SSD", "components", "ssd", 8999, "Samsung", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "1TB", Interface: "NVMe PCIe 4.0", Read: "7450 MB/s", Write: "6900 MB/s" }, { isTrending: true }, 20);
  p("ASUS ROG Strix B650-A", "components", "motherboards", 18999, "ASUS", "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop", { Socket: "AM5", Chipset: "B650", "Memory": "DDR5", "Form Factor": "ATX" }, {});
  p("Corsair RM750e PSU", "components", "power-supply", 6999, "Corsair", "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop", { Wattage: "750W", Efficiency: "80+ Gold", Modular: "Fully", Fan: "140mm" }, {}, 12);
  p("NZXT Kraken X63 AIO", "components", "cooling", 11999, "NZXT", "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop", { Type: "AIO Liquid", Radiator: "280mm", Fans: "2x 140mm", TDP: "250W+" }, { isNewArrival: true });
  p("Seagate Barracuda 2TB", "components", "hdd", 4499, "Seagate", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "2TB", Speed: "7200 RPM", Cache: "256MB", Interface: "SATA III" }, {});
  p("NZXT H510 Flow", "components", "cabinets", 6499, "NZXT", "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop", { Type: "Mid Tower", "Motherboard": "ATX", Fans: "2 included", "Front Panel": "Mesh" }, {});

  // PHONES
  p("Samsung Galaxy S24 Ultra", "phones", "android", 129999, "Samsung", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", { Display: "6.8\" QHD+ AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "12GB", Camera: "200MP" }, { isFeatured: true, isBestSeller: true }, 8);
  p("iPhone 15 Pro Max", "phones", "iphones", 159900, "Apple", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", { Display: "6.7\" Super Retina XDR", Chip: "A17 Pro", Storage: "256GB", Camera: "48MP" }, { isFeatured: true, isBestSeller: true });
  p("OnePlus 12", "phones", "android", 64999, "OnePlus", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", { Display: "6.82\" 2K AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "12GB", Camera: "50MP" }, { isTrending: true }, 10);
  p("Xiaomi 14 Ultra", "phones", "android", 89999, "Xiaomi", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", { Display: "6.73\" AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "16GB", Camera: "50MP Leica" }, { isNewArrival: true });
  p("Realme GT 5 Pro", "phones", "android", 36999, "Realme", "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop", { Display: "6.78\" AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "8GB", Camera: "50MP" }, { isTrending: true }, 15);
  p("iPhone 15", "phones", "iphones", 79900, "Apple", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", { Display: "6.1\" Super Retina XDR", Chip: "A16 Bionic", Storage: "128GB", Camera: "48MP" }, {});
  p("Samsung Galaxy A55 5G", "phones", "budget-phones", 27999, "Samsung", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", { Display: "6.6\" AMOLED", Processor: "Exynos 1480", RAM: "8GB", Camera: "50MP" }, { isBestSeller: true }, 12);
  p("Poco F6 5G", "phones", "budget-phones", 21999, "Xiaomi", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", { Display: "6.67\" AMOLED", Processor: "Snapdragon 8s Gen 3", RAM: "8GB", Camera: "50MP" }, { isTrending: true }, 18);
  p("ASUS ROG Phone 8", "phones", "gaming-phones", 74999, "ASUS", "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop", { Display: "6.78\" AMOLED 165Hz", Processor: "Snapdragon 8 Gen 3", RAM: "16GB", Battery: "5500mAh" }, { isFeatured: true });
  p("Refurbished iPhone 14", "phones", "refurbished-phones", 42999, "Apple", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", { Condition: "Like New", Display: "6.1\" OLED", Chip: "A15 Bionic", Warranty: "6 Months" }, {}, 30);

  // TABLETS
  p("iPad Air M2", "tablets", "ipads", 69900, "Apple", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", { Display: "11\" Liquid Retina", Chip: "Apple M2", Storage: "128GB", "Apple Pencil": "Yes" }, { isFeatured: true });
  p("Samsung Galaxy Tab S9 FE", "tablets", "android-tablets", 44999, "Samsung", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop", { Display: "10.9\" TFT", Processor: "Exynos 1380", RAM: "6GB", Battery: "8000mAh" }, { isBestSeller: true }, 10);
  p("Amazon Fire HD 10 Kids", "tablets", "kids-tablets", 17999, "Amazon", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", { Display: "10.1\" FHD", Storage: "32GB", "Kid-Proof Case": "Yes", "Parental Controls": "Yes" }, {});
  p("Wacom Intuos Pro", "tablets", "graphic-tablets", 29999, "Wacom", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop", { "Active Area": "224x148mm", "Pressure Levels": "8192", Connection: "Bluetooth/USB", Tilt: "60°" }, { isNewArrival: true });

  // MOBILE ACCESSORIES
  p("Spigen Tough Armor Case", "mobile-accessories", "phone-cases", 1299, "Spigen", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop", { Material: "TPU + PC", Compatibility: "iPhone 15", "Drop Protection": "Military Grade", Kickstand: "Yes" }, { isBestSeller: true });
  p("Tempered Glass Screen Protector", "mobile-accessories", "screen-protectors", 299, "Generic", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop", { Material: "9H Tempered Glass", Coverage: "Full Screen", Oleophobic: "Yes", Pack: "2 Pieces" }, {});
  p("Anker PowerPort III 65W", "mobile-accessories", "fast-chargers", 2999, "Anker", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Wattage: "65W", Ports: "2 USB-C + 1 USB-A", Protocol: "PD 3.0", "Foldable Plug": "Yes" }, { isTrending: true }, 20);
  p("Mi 20000mAh Power Bank", "mobile-accessories", "power-banks", 1499, "Xiaomi", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Capacity: "20000mAh", Output: "22.5W", Ports: "USB-C + USB-A", Weight: "405g" }, { isBestSeller: true }, 10);
  p("Samsung 25W Travel Charger", "mobile-accessories", "chargers", 1199, "Samsung", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Wattage: "25W", Type: "USB-C", Protocol: "PD 3.0", Cable: "Included" }, {});
  p("Lamicall Phone Stand", "mobile-accessories", "mobile-holders", 799, "Lamicall", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop", { Material: "Aluminum", Adjustable: "Yes", Compatible: "4-8\" Phones", Weight: "180g" }, {});
  p("DJI OM 6 Gimbal", "mobile-accessories", "selfie-sticks", 12999, "DJI", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Type: "3-Axis Gimbal", Stabilization: "ActiveTrack 5.0", Battery: "6.4h", Weight: "309g" }, { isNewArrival: true });
  p("SanDisk Ultra Dual OTG", "mobile-accessories", "otg-adapters", 499, "SanDisk", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Capacity: "64GB", Interface: "USB 3.0 + Type-C", Speed: "150 MB/s", Swivel: "Yes" }, {});

  // COMPUTER ACCESSORIES
  p("Logitech MX Keys S", "computer-accessories", "keyboards", 9995, "Logitech", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { Type: "Wireless", Connectivity: "Bluetooth + USB", Backlight: "Smart", Battery: "10 days" }, { isFeatured: true }, 15);
  p("Logitech MX Master 3S", "computer-accessories", "mice", 8995, "Logitech", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { DPI: "8000", Connectivity: "Bluetooth + USB", Battery: "70 days", Buttons: "7" }, { isBestSeller: true });
  p("Razer Gigantus V2 XXL", "computer-accessories", "mouse-pads", 2499, "Razer", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { Size: "940x410mm", Thickness: "4mm", Surface: "Micro-Weave", Base: "Non-Slip Rubber" }, {});
  p("Targus CityLite Pro 15.6\"", "computer-accessories", "laptop-bags", 3999, "Targus", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", { Fits: "Up to 15.6\"", Material: "Water-Resistant", Compartments: "3", Weight: "0.6kg" }, { isBestSeller: true }, 10);
  p("Rain Design mStand", "computer-accessories", "laptop-stands", 4999, "Rain Design", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { Material: "Aluminum", Fits: "Up to 16\"", Angle: "Ergonomic", Cable: "Management" }, {});
  p("Anker USB-C Hub 8-in-1", "computer-accessories", "usb-hubs", 3499, "Anker", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { Ports: "8", HDMI: "4K@60Hz", "PD Pass-through": "100W", Card: "SD/TF" }, { isTrending: true });
  p("Logitech C920 HD Pro", "computer-accessories", "webcams", 6999, "Logitech", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { Resolution: "1080p/30fps", "Field of View": "78°", Mic: "Dual Stereo", Mount: "Clip + Tripod" }, {});

  // STORAGE
  p("SanDisk Ultra Flair 128GB", "storage", "pen-drives", 799, "SanDisk", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "128GB", Speed: "150 MB/s", Interface: "USB 3.0", Design: "Metal" }, { isBestSeller: true });
  p("WD My Passport 2TB", "storage", "external-hdd", 5499, "Western Digital", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "2TB", Interface: "USB 3.0", Encryption: "256-bit AES", Compatible: "PC/Mac" }, { isBestSeller: true }, 8);
  p("Samsung T7 1TB SSD", "storage", "external-ssd", 7999, "Samsung", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "1TB", Speed: "1050 MB/s", Interface: "USB 3.2", Encryption: "AES 256-bit" }, { isTrending: true }, 15);
  p("Samsung EVO Plus 256GB", "storage", "memory-cards", 1799, "Samsung", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "256GB", Speed: "130 MB/s", Type: "microSDXC", "UHS Class": "U3" }, {});
  p("Anker 2-in-1 Card Reader", "storage", "card-readers", 899, "Anker", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Slots: "SD + microSD", Interface: "USB 3.0", Speed: "104 MB/s", Plug: "USB-A + USB-C" }, {});

  // AUDIO
  p("Sony WH-1000XM5", "audio", "headphones", 24990, "Sony", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", { Type: "Over-Ear ANC", Driver: "30mm", Battery: "30 hours", Codec: "LDAC" }, { isFeatured: true, isBestSeller: true }, 10);
  p("Apple AirPods Pro 2", "audio", "wireless-earbuds", 24900, "Apple", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop", { Type: "TWS ANC", Chip: "H2", Battery: "6h + 30h case", "Spatial Audio": "Yes" }, { isFeatured: true });
  p("JBL Tune 230NC", "audio", "wireless-earbuds", 4999, "JBL", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop", { Type: "TWS ANC", Driver: "12.4mm", Battery: "10h + 30h", "Water Resistant": "IPX4" }, { isTrending: true }, 25);
  p("boAt Rockerz 450", "audio", "headphones", 1499, "boAt", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", { Type: "On-Ear Wireless", Driver: "40mm", Battery: "15 hours", Mic: "Built-in" }, { isBestSeller: true }, 30);
  p("JBL Flip 6", "audio", "bt-speakers", 9999, "JBL", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", { Power: "30W", Battery: "12 hours", Waterproof: "IP67", Driver: "Racetrack" }, { isBestSeller: true }, 15);
  p("Sony HT-S400 Soundbar", "audio", "soundbars", 16990, "Sony", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", { Power: "330W", Channels: "2.1", "Subwoofer": "Wireless", "Bluetooth": "5.0" }, { isNewArrival: true });
  p("Sennheiser HD 560S", "audio", "headphones", 12990, "Sennheiser", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", { Type: "Open-Back Wired", Driver: "38mm", Impedance: "120Ω", Frequency: "6Hz-38kHz" }, {});
  p("boAt Airdopes 141", "audio", "wireless-earbuds", 999, "boAt", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop", { Type: "TWS", Driver: "8mm", Battery: "6h + 36h", "Water Resistant": "IPX4" }, { isBestSeller: true }, 40);
  p("HyperX Cloud II", "audio", "gaming-headsets", 6999, "HyperX", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", { Type: "Over-Ear Wired", Driver: "53mm", Sound: "7.1 Surround", Mic: "Detachable" }, { isBestSeller: true }, 10);
  p("Bose SoundLink Flex", "audio", "bt-speakers", 12999, "Bose", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", { Power: "Custom", Battery: "12 hours", Waterproof: "IP67", Weight: "580g" }, { isTrending: true });

  // NETWORKING
  p("TP-Link Archer AX73", "networking", "routers", 7999, "TP-Link", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", { Speed: "AX5400", Band: "Dual", Ports: "4 Gigabit", Antenna: "6" }, { isBestSeller: true }, 10);
  p("Netgear Nighthawk AX6", "networking", "routers", 12999, "Netgear", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", { Speed: "AX4200", Band: "Tri-Band", Coverage: "2500 sq ft", Mesh: "Ready" }, { isFeatured: true });
  p("TP-Link RE605X Extender", "networking", "range-extenders", 4999, "TP-Link", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", { Speed: "AX1800", Band: "Dual", Port: "1 Gigabit", Setup: "WPS" }, {});
  p("Cat 6 Ethernet Cable 10m", "networking", "lan-cables", 499, "Generic", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Category: "Cat 6", Length: "10m", Speed: "1Gbps", Shielding: "UTP" }, {});
  p("TP-Link TL-SG108 Switch", "networking", "network-switches", 2499, "TP-Link", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", { Ports: "8 Gigabit", Switching: "16 Gbps", Metal: "Yes", Fanless: "Yes" }, {});

  // GAMING ACCESSORIES
  p("Razer DeathAdder V3", "gaming", "gaming-mouse", 5999, "Razer", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { DPI: "30000", Switches: "Optical Gen-3", Weight: "59g", Cable: "Speedflex" }, { isFeatured: true, isBestSeller: true }, 10);
  p("Razer Huntsman V3 Pro", "gaming", "gaming-keyboard", 17999, "Razer", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { Switches: "Analog Optical", Actuation: "0.1-4.0mm", Layout: "Full Size", "Wrist Rest": "Magnetic" }, { isNewArrival: true });
  p("Xbox Wireless Controller", "gaming", "controllers", 5490, "Microsoft", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { Connectivity: "Bluetooth + USB", Battery: "40 hours", Compatible: "PC/Xbox", Vibration: "Haptic" }, { isBestSeller: true });
  p("Secretlab Titan Evo", "gaming", "gaming-chairs", 37999, "Secretlab", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { Material: "NEO Hybrid Leatherette", Recline: "165°", Lumbar: "4-Way", Weight: "Up to 130kg" }, { isFeatured: true });
  p("SteelSeries QcK Heavy XXL", "gaming", "gaming-mousepads", 2999, "SteelSeries", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { Size: "900x400mm", Thickness: "6mm", Surface: "Micro-Woven Cloth", Base: "Non-Slip Rubber" }, {});
  p("SteelSeries Arctis Nova 7", "gaming", "gaming-headset", 13999, "SteelSeries", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { Type: "Wireless", Driver: "40mm", Battery: "38 hours", Mic: "ClearCast Gen 2" }, { isTrending: true }, 12);

  // PRINTERS
  p("HP Smart Tank 580", "printers", "inkjet", 13999, "HP", "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop", { Type: "All-in-One", Print: "Color", Connectivity: "WiFi", "Cost/Page": "Very Low" }, { isBestSeller: true }, 10);
  p("Brother HL-L2351DW", "printers", "laser", 11999, "Brother", "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop", { Type: "Mono Laser", Speed: "32 ppm", Duplex: "Auto", Connectivity: "WiFi" }, {});
  p("Epson Perfection V39", "printers", "scanners", 7999, "Epson", "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop", { Type: "Flatbed", Resolution: "4800 dpi", Speed: "10 sec/page", Size: "A4" }, {});

  // SMART GADGETS
  p("Apple Watch Series 9", "smart-gadgets", "smartwatches", 41900, "Apple", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Display: "45mm OLED", Chip: "S9", Battery: "18 hours", Features: "ECG, SpO2, Crash Detection" }, { isFeatured: true, isBestSeller: true });
  p("Samsung Galaxy Watch 6", "smart-gadgets", "smartwatches", 24999, "Samsung", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Display: "44mm AMOLED", Processor: "Exynos W930", Battery: "40 hours", OS: "Wear OS" }, { isTrending: true }, 15);
  p("Fitbit Charge 6", "smart-gadgets", "fitness-bands", 14999, "Fitbit", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Display: "AMOLED", Battery: "7 days", GPS: "Built-in", Sensors: "Heart Rate, SpO2" }, { isBestSeller: true });
  p("Amazfit Band 7", "smart-gadgets", "fitness-bands", 3499, "Amazfit", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Display: "1.47\" AMOLED", Battery: "18 days", Modes: "120 Sports", Water: "5 ATM" }, {}, 20);
  p("Ring Video Doorbell", "smart-gadgets", "security-cameras", 12999, "Ring", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Resolution: "1080p", "Field of View": "155°", Audio: "Two-Way", Power: "Battery" }, { isNewArrival: true });
  p("Philips Hue Starter Kit", "smart-gadgets", "smart-lights", 9999, "Philips", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Bulbs: "3x E27", Bridge: "Included", Colors: "16 Million", Voice: "Alexa/Google" }, {});
  p("Amazon Echo Dot 5th Gen", "smart-gadgets", "smart-home", 4499, "Amazon", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Speaker: "1.73\"", Assistant: "Alexa", Connectivity: "WiFi + BT", Features: "Temperature Sensor" }, { isTrending: true }, 25);

  // CABLES
  p("Belkin HDMI 2.1 Cable 2m", "cables", "hdmi", 1299, "Belkin", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Version: "HDMI 2.1", Length: "2m", Bandwidth: "48Gbps", Resolution: "8K@60Hz" }, {});
  p("Anker USB-C to C Cable 2m", "cables", "type-c", 799, "Anker", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Type: "USB-C to C", Length: "2m", Speed: "480Mbps", Power: "100W PD" }, { isBestSeller: true });
  p("Apple Lightning Cable 1m", "cables", "lightning", 1900, "Apple", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Type: "Lightning to USB-C", Length: "1m", MFi: "Certified", Material: "Braided" }, {});
  p("USB-C Multiport Adapter", "cables", "usb-adapters", 2499, "Anker", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Ports: "HDMI+USB+SD+PD", HDMI: "4K@30Hz", PD: "100W", Weight: "55g" }, {});

  // Additional products to reach 200+
  // More laptops
  p("Dell XPS 15 9530", "computers", "laptops", 142999, "Dell", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", { Processor: "Intel i7-13700H", RAM: "16GB DDR5", Storage: "512GB SSD", Display: "15.6\" 3.5K OLED" }, { isNewArrival: true, isFeatured: true });
  p("HP Victus 15", "computers", "laptops", 62999, "HP", "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop", { Processor: "AMD Ryzen 5 7535HS", RAM: "8GB DDR5", Storage: "512GB SSD", GPU: "RTX 2050" }, {}, 15);
  p("ASUS ROG Strix G16", "computers", "gaming-pcs", 119999, "ASUS", "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop", { Processor: "Intel i7-13650HX", RAM: "16GB DDR5", Storage: "1TB SSD", GPU: "RTX 4060" }, { isFeatured: true });

  // More phones
  p("Google Pixel 8 Pro", "phones", "android", 94999, "Google", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", { Display: "6.7\" LTPO OLED", Processor: "Tensor G3", RAM: "12GB", Camera: "50MP + 48MP + 48MP" }, { isNewArrival: true }, 10);
  p("Vivo X100 Pro", "phones", "android", 79999, "Vivo", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", { Display: "6.78\" AMOLED 120Hz", Processor: "Dimensity 9300", RAM: "16GB", Camera: "50MP Zeiss" }, { isTrending: true });
  p("Samsung Galaxy Z Fold 5", "phones", "android", 154999, "Samsung", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", { Display: "7.6\" Foldable AMOLED", Processor: "Snapdragon 8 Gen 2", RAM: "12GB", Camera: "50MP" }, { isFeatured: true });
  p("Redmi Note 13 Pro+", "phones", "budget-phones", 29999, "Xiaomi", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", { Display: "6.67\" AMOLED 120Hz", Processor: "Dimensity 7200", RAM: "12GB", Camera: "200MP" }, { isBestSeller: true }, 20);
  p("iQOO Neo 9 Pro", "phones", "gaming-phones", 34999, "iQOO", "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop", { Display: "6.78\" AMOLED 144Hz", Processor: "Snapdragon 8 Gen 2", RAM: "8GB", Battery: "5160mAh" }, { isTrending: true }, 10);

  // More audio
  p("Sony WF-1000XM5", "audio", "wireless-earbuds", 19990, "Sony", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop", { Type: "TWS ANC", Driver: "8.4mm", Battery: "8h + 16h", Codec: "LDAC" }, { isFeatured: true });
  p("Marshall Major IV", "audio", "headphones", 9999, "Marshall", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", { Type: "On-Ear Wireless", Driver: "40mm", Battery: "80 hours", Charging: "Wireless" }, { isTrending: true });
  p("JBL PartyBox Encore", "audio", "bt-speakers", 19999, "JBL", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", { Power: "100W", Battery: "10 hours", Mic: "2 Wireless", Light: "Dynamic" }, { isNewArrival: true });

  // More components
  p("AMD Ryzen 7 7700X", "components", "cpu", 24999, "AMD", "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop", { Cores: "8", Threads: "16", "Base Clock": "4.5 GHz", "Boost Clock": "5.4 GHz" }, { isNewArrival: true });
  p("NVIDIA RTX 4080 Super", "components", "graphics-cards", 89999, "NVIDIA", "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop", { Memory: "16GB GDDR6X", "Core Clock": "2550 MHz", Power: "320W", Interface: "PCIe 4.0" }, { isNewArrival: true });
  p("Kingston Fury Beast 32GB DDR5", "components", "ram", 8999, "Kingston", "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop", { Capacity: "32GB (2x16GB)", Speed: "6000MHz", Type: "DDR5", XMP: "3.0" }, { isTrending: true });
  p("WD Black SN850X 2TB", "components", "ssd", 13999, "Western Digital", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "2TB", Interface: "NVMe PCIe 4.0", Read: "7300 MB/s", Write: "6600 MB/s" }, { isFeatured: true });

  // More gaming
  p("Logitech G Pro X Superlight 2", "gaming", "gaming-mouse", 12999, "Logitech", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { DPI: "32000", Weight: "60g", Sensor: "HERO 2", Battery: "95 hours" }, { isNewArrival: true });
  p("PS5 DualSense Controller", "gaming", "controllers", 5990, "Sony", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", { Connectivity: "Bluetooth + USB", Haptic: "Yes", Triggers: "Adaptive", Battery: "12 hours" }, { isTrending: true });

  // More storage
  p("SanDisk Extreme Pro 512GB", "storage", "pen-drives", 3999, "SanDisk", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "512GB", Speed: "420 MB/s", Interface: "USB 3.2", Material: "Aluminum" }, { isNewArrival: true });
  p("Seagate Expansion 4TB", "storage", "external-hdd", 8999, "Seagate", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "4TB", Interface: "USB 3.0", Compatible: "PC/Mac", Design: "Portable" }, {});
  p("Samsung T9 2TB SSD", "storage", "external-ssd", 15999, "Samsung", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", { Capacity: "2TB", Speed: "2000 MB/s", Interface: "USB 3.2 Gen2x2", Rugged: "IP68" }, { isNewArrival: true, isFeatured: true });

  // More smart gadgets
  p("Noise ColorFit Pro 5", "smart-gadgets", "smartwatches", 4999, "Noise", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Display: "1.85\" AMOLED", Battery: "7 days", Calling: "Bluetooth", Sports: "100+" }, { isBestSeller: true }, 30);
  p("Garmin Venu 3", "smart-gadgets", "smartwatches", 49990, "Garmin", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Display: "1.4\" AMOLED", Battery: "14 days", GPS: "Multi-Band", Music: "Yes" }, { isNewArrival: true });
  p("TP-Link Tapo C210 Camera", "smart-gadgets", "security-cameras", 2999, "TP-Link", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", { Resolution: "3MP", "Pan/Tilt": "360°/114°", Night: "30ft", Storage: "microSD" }, { isBestSeller: true });

  // More mobile accessories
  p("Anker Nano 45W Charger", "mobile-accessories", "fast-chargers", 1999, "Anker", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Wattage: "45W", Ports: "1 USB-C", Protocol: "PD 3.0", Size: "Ultra Compact" }, { isNewArrival: true });
  p("Baseus 30000mAh Power Bank", "mobile-accessories", "power-banks", 2999, "Baseus", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", { Capacity: "30000mAh", Output: "65W", Ports: "2C + 1A", Display: "Digital" }, { isTrending: true });

  // More computer accessories
  p("Keychron K8 Pro", "computer-accessories", "keyboards", 7999, "Keychron", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { Switches: "Gateron G Pro", Layout: "TKL", Connectivity: "Bluetooth + USB", "Hot-Swap": "Yes" }, { isTrending: true });
  p("Razer Viper V3", "computer-accessories", "mice", 4999, "Razer", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", { DPI: "30000", Weight: "49g", Connectivity: "Wireless", Battery: "90 hours" }, { isNewArrival: true });

  // More networking
  p("ASUS RT-AX86U Pro", "networking", "routers", 19999, "ASUS", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", { Speed: "AX5700", Band: "Dual", Ports: "4 Gigabit + 2.5G", Gaming: "Gear Accelerator" }, { isFeatured: true });
  p("TP-Link Deco X50 (3-pack)", "networking", "routers", 14999, "TP-Link", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", { Speed: "AX3000", Coverage: "6500 sq ft", Mesh: "True Mesh", Ports: "3 Gigabit" }, { isTrending: true });

  // More cables
  p("DisplayPort 1.4 Cable 2m", "cables", "displayport", 999, "Generic", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Version: "DP 1.4", Length: "2m", Resolution: "8K@60Hz", HDR: "Yes" }, {});
  p("VGA Cable 3m", "cables", "vga", 399, "Generic", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", { Length: "3m", Resolution: "1080p", Connector: "Male-Male", Shielding: "Ferrite Core" }, {});

  // More printers
  p("Canon PIXMA G3020", "printers", "inkjet", 10999, "Canon", "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop", { Type: "Tank All-in-One", Print: "Color", WiFi: "Yes", Pages: "7700 B&W" }, { isBestSeller: true });
  p("HP LaserJet M141w", "printers", "laser", 13999, "HP", "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop", { Type: "Mono MFP", Speed: "20 ppm", WiFi: "Yes", ADF: "No" }, {});

  // More tablets
  p("iPad 10th Gen", "tablets", "ipads", 44900, "Apple", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", { Display: "10.9\" Liquid Retina", Chip: "A14 Bionic", Storage: "64GB", Connectivity: "WiFi + 5G" }, { isBestSeller: true }, 10);
  p("Lenovo Tab M10 Plus", "tablets", "android-tablets", 18999, "Lenovo", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop", { Display: "10.6\" 2K IPS", Processor: "MediaTek Helio G80", RAM: "4GB", Battery: "7700mAh" }, {}, 15);

  // Extra products to push past 200
  const extraItems = [
    { n: "Corsair K70 RGB Pro", c: "gaming", s: "gaming-keyboard", pr: 12999, b: "Corsair", f: { isBestSeller: true } },
    { n: "Razer BlackWidow V4", c: "gaming", s: "gaming-keyboard", pr: 14999, b: "Razer", f: { isTrending: true } },
    { n: "Logitech G733 Headset", c: "gaming", s: "gaming-headset", pr: 12999, b: "Logitech", f: {} },
    { n: "Trust GXT 707 Gaming Chair", c: "gaming", s: "gaming-chairs", pr: 15999, b: "Trust", f: {} },
    { n: "Cosmic Byte Equinox Mousepad", c: "gaming", s: "gaming-mousepads", pr: 999, b: "Cosmic Byte", f: {} },
    { n: "HP Ink Advantage 2778", c: "printers", s: "inkjet", pr: 5999, b: "HP", f: { isBestSeller: true }, d: 20 },
    { n: "Canon LBP6030B Laser", c: "printers", s: "laser", pr: 10999, b: "Canon", f: {} },
    { n: "HP 802 Ink Cartridge Black", c: "printers", s: "printer-ink", pr: 699, b: "HP", f: { isBestSeller: true } },
    { n: "Samsung 128GB EVO Select", c: "storage", s: "memory-cards", pr: 999, b: "Samsung", f: {} },
    { n: "Transcend USB 3.0 Card Reader", c: "storage", s: "card-readers", pr: 599, b: "Transcend", f: {} },
    { n: "TP-Link USB WiFi Adapter", c: "networking", s: "wifi-adapters", pr: 899, b: "TP-Link", f: {} },
    { n: "D-Link DWR-920 4G Router", c: "networking", s: "routers", pr: 4999, b: "D-Link", f: {} },
    { n: "USB-C to HDMI Cable 1.8m", c: "cables", s: "hdmi", pr: 899, b: "Generic", f: {} },
    { n: "Nillkin iPhone 15 Case", c: "mobile-accessories", s: "phone-cases", pr: 899, b: "Nillkin", f: {} },
    { n: "boAt Stone 352", c: "audio", s: "bt-speakers", pr: 1799, b: "boAt", f: { isBestSeller: true }, d: 25 },
    { n: "Zebronics Zeb-Juke Bar 9500", c: "audio", s: "soundbars", pr: 6999, b: "Zebronics", f: {} },
    { n: "boAt BassHeads 100", c: "audio", s: "earphones", pr: 449, b: "boAt", f: { isBestSeller: true } },
    { n: "Sony MDR-EX150AP", c: "audio", s: "earphones", pr: 999, b: "Sony", f: {} },
    { n: "HP 150 Wired Mouse", c: "computer-accessories", s: "mice", pr: 399, b: "HP", f: {} },
    { n: "Dell KB216 Wired Keyboard", c: "computer-accessories", s: "keyboards", pr: 599, b: "Dell", f: {} },
    { n: "Logitech C270 HD Webcam", c: "computer-accessories", s: "webcams", pr: 2499, b: "Logitech", f: {}, d: 10 },
    { n: "Portronics Mport 7C USB Hub", c: "computer-accessories", s: "usb-hubs", pr: 1499, b: "Portronics", f: {} },
    { n: "AmazonBasics Laptop Stand", c: "computer-accessories", s: "laptop-stands", pr: 1999, b: "Amazon", f: {} },
    { n: "Safari Laptop Backpack", c: "computer-accessories", s: "laptop-bags", pr: 1799, b: "Safari", f: {} },
    { n: "Cosmic Byte Dwarf Mouse Pad", c: "computer-accessories", s: "mouse-pads", pr: 299, b: "Cosmic Byte", f: {} },
    { n: "Refurbished Galaxy S23", c: "phones", s: "refurbished-phones", pr: 37999, b: "Samsung", f: {}, d: 35 },
    { n: "Oppo Reno 11 5G", c: "phones", s: "android", pr: 29999, b: "Oppo", f: { isNewArrival: true } },
    { n: "Samsung Galaxy A15", c: "phones", s: "budget-phones", pr: 14999, b: "Samsung", f: {}, d: 10 },
    { n: "Noise ColorFit Pulse 4", c: "smart-gadgets", s: "fitness-bands", pr: 1999, b: "Noise", f: { isBestSeller: true } },
    { n: "HP 680 Ink Cartridge Color", c: "printers", s: "printer-ink", pr: 799, b: "HP", f: {} },
    { n: "Brother TN-2365 Toner", c: "printers", s: "toner", pr: 2499, b: "Brother", f: {} },
    { n: "Canon 88A Toner", c: "printers", s: "toner", pr: 1999, b: "Canon", f: {} },
    { n: "Lightning to 3.5mm Adapter", c: "cables", s: "lightning", pr: 799, b: "Apple", f: {} },
    { n: "Baseus USB-C Hub 6-in-1", c: "cables", s: "usb-adapters", pr: 1999, b: "Baseus", f: {} },
    { n: "Samsung Galaxy Tab A9", c: "tablets", s: "android-tablets", pr: 12999, b: "Samsung", f: {}, d: 10 },
    { n: "XP-Pen Deco 01 V2", c: "tablets", s: "graphic-tablets", pr: 5999, b: "XP-Pen", f: {} },
    { n: "Fire HD 8 Kids Pro", c: "tablets", s: "kids-tablets", pr: 11999, b: "Amazon", f: {} },
    { n: "Anker 20W USB-C Charger", c: "mobile-accessories", s: "chargers", pr: 999, b: "Anker", f: {} },
    { n: "ESR MagSafe Car Mount", c: "mobile-accessories", s: "mobile-holders", pr: 1999, b: "ESR", f: { isNewArrival: true } },
    { n: "TP-Link Archer AX55", c: "networking", s: "routers", pr: 5499, b: "TP-Link", f: {} },
    { n: "Netgear EX6120 Extender", c: "networking", s: "range-extenders", pr: 2499, b: "Netgear", f: {} },
    { n: "D-Link 8 Port Switch", c: "networking", s: "network-switches", pr: 1999, b: "D-Link", f: {} },
    { n: "MacBook Pro M3 14\"", c: "computers", s: "laptops", pr: 169900, b: "Apple", f: { isFeatured: true, isNewArrival: true } },
    { n: "Lenovo Legion 5 Pro", c: "computers", s: "gaming-pcs", pr: 134999, b: "Lenovo", f: { isFeatured: true } },
    { n: "Dell Precision 3680", c: "computers", s: "workstations", pr: 89999, b: "Dell", f: {} },
    { n: "HP Z2 Mini G9 Workstation", c: "computers", s: "workstations", pr: 109999, b: "HP", f: { isNewArrival: true } },
    { n: "Intel i5-14400F", c: "components", s: "cpu", pr: 14999, b: "Intel", f: {} },
    { n: "Gigabyte B760M DS3H", c: "components", s: "motherboards", pr: 9999, b: "Gigabyte", f: {} },
    { n: "AMD RX 7600", c: "components", s: "graphics-cards", pr: 24999, b: "AMD", f: { isTrending: true } },
    { n: "Deepcool AK620 Cooler", c: "components", s: "cooling", pr: 4999, b: "Deepcool", f: {} },
    { n: "Cooler Master Q300L Case", c: "components", s: "cabinets", pr: 3999, b: "Cooler Master", f: {} },
    { n: "Corsair CV550 PSU", c: "components", s: "power-supply", pr: 3999, b: "Corsair", f: {} },
    // More tablets to reach 10
    { n: "iPad Pro M4 11\"", c: "tablets", s: "ipads", pr: 99900, b: "Apple", f: { isFeatured: true, isNewArrival: true } },
    { n: "Samsung Galaxy Tab S9 Ultra", c: "tablets", s: "android-tablets", pr: 108999, b: "Samsung", f: { isFeatured: true } },
    { n: "Xiaomi Pad 6", c: "tablets", s: "android-tablets", pr: 24999, b: "Xiaomi", f: { isTrending: true }, d: 10 },
    // More cables to reach 10
    { n: "Baseus HDMI 2.1 Cable 3m", c: "cables", s: "hdmi", pr: 1499, b: "Baseus", f: {} },
    { n: "Anker USB-A to Lightning 1.8m", c: "cables", s: "lightning", pr: 999, b: "Anker", f: {} },
    { n: "UGREEN USB-C to USB-C 100W 2m", c: "cables", s: "type-c", pr: 699, b: "UGREEN", f: { isBestSeller: true } },
    // More printers to reach 10
    { n: "Epson EcoTank L3250", c: "printers", s: "inkjet", pr: 12999, b: "Epson", f: { isTrending: true } },
    { n: "Canon imageCLASS LBP236dw", c: "printers", s: "laser", pr: 18999, b: "Canon", f: { isNewArrival: true } },
    // More storage to reach 10
    { n: "Kingston DataTraveler Max 256GB", c: "storage", s: "pen-drives", pr: 2499, b: "Kingston", f: { isTrending: true } },
    { n: "WD Elements SE 1TB SSD", c: "storage", s: "external-ssd", pr: 6499, b: "Western Digital", f: {} },
    // More networking to reach 10
    { n: "ASUS ZenWiFi AX Mini (2-pack)", c: "networking", s: "routers", pr: 9999, b: "ASUS", f: { isNewArrival: true } },
    // More smart gadgets to reach 10
    { n: "Xiaomi Smart Band 8 Pro", c: "smart-gadgets", s: "fitness-bands", pr: 3999, b: "Xiaomi", f: { isNewArrival: true } },
    { n: "Google Nest Mini 2nd Gen", c: "smart-gadgets", s: "smart-home", pr: 3499, b: "Google", f: {} },
    // More mobile accessories to reach 10
    { n: "Ringke Fusion Case Galaxy S24", c: "mobile-accessories", s: "phone-cases", pr: 1499, b: "Ringke", f: {} },
    { n: "ZAGG InvisibleShield Glass+", c: "mobile-accessories", s: "screen-protectors", pr: 999, b: "ZAGG", f: { isNewArrival: true } },
  ];

  for (const item of extraItems) {
    p(
      item.n,
      item.c,
      item.s,
      item.pr,
      item.b,
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
      { Brand: item.b, Category: item.s.replace(/-/g, " ") },
      item.f,
      (item as any).d
    );
  }

  return products;
}

export const products = generateProducts();

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (cat: string) => products.filter(p => p.category === cat);
export const getProductsBySubcategory = (sub: string) => products.filter(p => p.subcategory === sub);
export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getTrendingProducts = () => products.filter(p => p.isTrending);
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getNewArrivals = () => products.filter(p => p.isNewArrival);
export const getDiscountedProducts = () => products.filter(p => p.discountPrice);
export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
};
