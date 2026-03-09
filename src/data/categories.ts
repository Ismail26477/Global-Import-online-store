import catComputers from "@/assets/cat-computers.jpg";
import catComponents from "@/assets/cat-components.jpg";
import catPhones from "@/assets/cat-phones.jpg";
import catTablets from "@/assets/cat-tablets.jpg";
import catMobileAcc from "@/assets/cat-mobile-acc.jpg";
import catComputerAcc from "@/assets/cat-computer-acc.jpg";
import catStorage from "@/assets/cat-storage.jpg";
import catAudio from "@/assets/cat-audio.jpg";
import catNetworking from "@/assets/cat-networking.jpg";
import catGaming from "@/assets/cat-gaming.jpg";
import catPrinters from "@/assets/cat-printers.jpg";
import catSmartGadgets from "@/assets/cat-smart-gadgets.jpg";
import catCables from "@/assets/cat-cables.jpg";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export const categories: Category[] = [
  {
    id: "computers",
    name: "Computers",
    slug: "computers",
    icon: "💻",
    image: catComputers,
    subcategories: [
      { id: "laptops", name: "Laptops", slug: "laptops", parentId: "computers" },
      { id: "desktop-pcs", name: "Desktop PCs", slug: "desktop-pcs", parentId: "computers" },
      { id: "all-in-one", name: "All-in-One PCs", slug: "all-in-one", parentId: "computers" },
      { id: "gaming-pcs", name: "Gaming PCs", slug: "gaming-pcs", parentId: "computers" },
      { id: "mini-pcs", name: "Mini PCs", slug: "mini-pcs", parentId: "computers" },
      { id: "workstations", name: "Workstations", slug: "workstations", parentId: "computers" },
    ],
  },
  {
    id: "components",
    name: "Computer Components",
    slug: "components",
    icon: "🔧",
    image: catComponents,
    subcategories: [
      { id: "cpu", name: "CPU", slug: "cpu", parentId: "components" },
      { id: "motherboards", name: "Motherboards", slug: "motherboards", parentId: "components" },
      { id: "ram", name: "RAM", slug: "ram", parentId: "components" },
      { id: "graphics-cards", name: "Graphics Cards", slug: "graphics-cards", parentId: "components" },
      { id: "hdd", name: "HDD", slug: "hdd", parentId: "components" },
      { id: "ssd", name: "SSD", slug: "ssd", parentId: "components" },
      { id: "power-supply", name: "Power Supply", slug: "power-supply", parentId: "components" },
      { id: "cooling", name: "Cooling Systems", slug: "cooling", parentId: "components" },
      { id: "cabinets", name: "PC Cabinets", slug: "cabinets", parentId: "components" },
    ],
  },
  {
    id: "phones",
    name: "Mobile Phones",
    slug: "phones",
    icon: "📱",
    image: catPhones,
    subcategories: [
      { id: "android", name: "Android Phones", slug: "android", parentId: "phones" },
      { id: "iphones", name: "iPhones", slug: "iphones", parentId: "phones" },
      { id: "budget-phones", name: "Budget Smartphones", slug: "budget-phones", parentId: "phones" },
      { id: "gaming-phones", name: "Gaming Smartphones", slug: "gaming-phones", parentId: "phones" },
      { id: "refurbished-phones", name: "Refurbished Phones", slug: "refurbished-phones", parentId: "phones" },
    ],
  },
  {
    id: "tablets",
    name: "Tablets",
    slug: "tablets",
    icon: "📋",
    image: catTablets,
    subcategories: [
      { id: "android-tablets", name: "Android Tablets", slug: "android-tablets", parentId: "tablets" },
      { id: "ipads", name: "iPads", slug: "ipads", parentId: "tablets" },
      { id: "kids-tablets", name: "Kids Tablets", slug: "kids-tablets", parentId: "tablets" },
      { id: "graphic-tablets", name: "Graphic Tablets", slug: "graphic-tablets", parentId: "tablets" },
    ],
  },
  {
    id: "mobile-accessories",
    name: "Mobile Accessories",
    slug: "mobile-accessories",
    icon: "🔌",
    image: catMobileAcc,
    subcategories: [
      { id: "phone-cases", name: "Phone Cases", slug: "phone-cases", parentId: "mobile-accessories" },
      { id: "screen-protectors", name: "Screen Protectors", slug: "screen-protectors", parentId: "mobile-accessories" },
      { id: "chargers", name: "Chargers", slug: "chargers", parentId: "mobile-accessories" },
      { id: "fast-chargers", name: "Fast Chargers", slug: "fast-chargers", parentId: "mobile-accessories" },
      { id: "power-banks", name: "Power Banks", slug: "power-banks", parentId: "mobile-accessories" },
      { id: "mobile-holders", name: "Mobile Holders", slug: "mobile-holders", parentId: "mobile-accessories" },
      { id: "selfie-sticks", name: "Selfie Sticks", slug: "selfie-sticks", parentId: "mobile-accessories" },
      { id: "otg-adapters", name: "OTG Adapters", slug: "otg-adapters", parentId: "mobile-accessories" },
    ],
  },
  {
    id: "computer-accessories",
    name: "Computer Accessories",
    slug: "computer-accessories",
    icon: "⌨️",
    image: catComputerAcc,
    subcategories: [
      { id: "keyboards", name: "Keyboards", slug: "keyboards", parentId: "computer-accessories" },
      { id: "mice", name: "Mouse", slug: "mice", parentId: "computer-accessories" },
      { id: "mouse-pads", name: "Mouse Pads", slug: "mouse-pads", parentId: "computer-accessories" },
      { id: "laptop-bags", name: "Laptop Bags", slug: "laptop-bags", parentId: "computer-accessories" },
      { id: "laptop-stands", name: "Laptop Stands", slug: "laptop-stands", parentId: "computer-accessories" },
      { id: "usb-hubs", name: "USB Hubs", slug: "usb-hubs", parentId: "computer-accessories" },
      { id: "webcams", name: "Webcams", slug: "webcams", parentId: "computer-accessories" },
    ],
  },
  {
    id: "storage",
    name: "Storage Devices",
    slug: "storage",
    icon: "💾",
    image: catStorage,
    subcategories: [
      { id: "pen-drives", name: "Pen Drives", slug: "pen-drives", parentId: "storage" },
      { id: "external-hdd", name: "External Hard Drives", slug: "external-hdd", parentId: "storage" },
      { id: "external-ssd", name: "External SSD", slug: "external-ssd", parentId: "storage" },
      { id: "memory-cards", name: "Memory Cards", slug: "memory-cards", parentId: "storage" },
      { id: "card-readers", name: "Card Readers", slug: "card-readers", parentId: "storage" },
    ],
  },
  {
    id: "audio",
    name: "Audio Devices",
    slug: "audio",
    icon: "🎧",
    image: catAudio,
    subcategories: [
      { id: "headphones", name: "Headphones", slug: "headphones", parentId: "audio" },
      { id: "earphones", name: "Earphones", slug: "earphones", parentId: "audio" },
      { id: "wireless-earbuds", name: "Wireless Earbuds", slug: "wireless-earbuds", parentId: "audio" },
      { id: "gaming-headsets", name: "Gaming Headsets", slug: "gaming-headsets", parentId: "audio" },
      { id: "bt-speakers", name: "Bluetooth Speakers", slug: "bt-speakers", parentId: "audio" },
      { id: "soundbars", name: "Soundbars", slug: "soundbars", parentId: "audio" },
    ],
  },
  {
    id: "networking",
    name: "Networking Devices",
    slug: "networking",
    icon: "🌐",
    image: catNetworking,
    subcategories: [
      { id: "routers", name: "WiFi Routers", slug: "routers", parentId: "networking" },
      { id: "range-extenders", name: "Range Extenders", slug: "range-extenders", parentId: "networking" },
      { id: "lan-cables", name: "LAN Cables", slug: "lan-cables", parentId: "networking" },
      { id: "network-switches", name: "Network Switches", slug: "network-switches", parentId: "networking" },
      { id: "wifi-adapters", name: "USB WiFi Adapters", slug: "wifi-adapters", parentId: "networking" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming Accessories",
    slug: "gaming",
    icon: "🎮",
    image: catGaming,
    subcategories: [
      { id: "gaming-mouse", name: "Gaming Mouse", slug: "gaming-mouse", parentId: "gaming" },
      { id: "gaming-keyboard", name: "Gaming Keyboard", slug: "gaming-keyboard", parentId: "gaming" },
      { id: "gaming-headset", name: "Gaming Headsets", slug: "gaming-headset", parentId: "gaming" },
      { id: "controllers", name: "Game Controllers", slug: "controllers", parentId: "gaming" },
      { id: "gaming-chairs", name: "Gaming Chairs", slug: "gaming-chairs", parentId: "gaming" },
      { id: "gaming-mousepads", name: "Gaming Mousepads", slug: "gaming-mousepads", parentId: "gaming" },
    ],
  },
  {
    id: "printers",
    name: "Printers & Office",
    slug: "printers",
    icon: "🖨️",
    image: catPrinters,
    subcategories: [
      { id: "inkjet", name: "Inkjet Printers", slug: "inkjet", parentId: "printers" },
      { id: "laser", name: "Laser Printers", slug: "laser", parentId: "printers" },
      { id: "scanners", name: "Scanners", slug: "scanners", parentId: "printers" },
      { id: "printer-ink", name: "Printer Ink", slug: "printer-ink", parentId: "printers" },
      { id: "toner", name: "Toner", slug: "toner", parentId: "printers" },
    ],
  },
  {
    id: "smart-gadgets",
    name: "Smart Gadgets",
    slug: "smart-gadgets",
    icon: "⌚",
    image: catSmartGadgets,
    subcategories: [
      { id: "smartwatches", name: "Smart Watches", slug: "smartwatches", parentId: "smart-gadgets" },
      { id: "fitness-bands", name: "Fitness Bands", slug: "fitness-bands", parentId: "smart-gadgets" },
      { id: "smart-home", name: "Smart Home Devices", slug: "smart-home", parentId: "smart-gadgets" },
      { id: "smart-lights", name: "Smart Lights", slug: "smart-lights", parentId: "smart-gadgets" },
      { id: "security-cameras", name: "Security Cameras", slug: "security-cameras", parentId: "smart-gadgets" },
    ],
  },
  {
    id: "cables",
    name: "Cables & Adapters",
    slug: "cables",
    icon: "🔗",
    image: catCables,
    subcategories: [
      { id: "hdmi", name: "HDMI", slug: "hdmi", parentId: "cables" },
      { id: "type-c", name: "Type-C", slug: "type-c", parentId: "cables" },
      { id: "lightning", name: "Lightning", slug: "lightning", parentId: "cables" },
      { id: "vga", name: "VGA", slug: "vga", parentId: "cables" },
      { id: "displayport", name: "DisplayPort", slug: "displayport", parentId: "cables" },
      { id: "usb-adapters", name: "USB Adapters", slug: "usb-adapters", parentId: "cables" },
    ],
  },
];

export const getAllSubcategories = () => {
  return categories.flatMap(c => c.subcategories);
};

export const getCategoryBySlug = (slug: string) => {
  return categories.find(c => c.slug === slug);
};

export const getSubcategoryBySlug = (slug: string) => {
  for (const cat of categories) {
    const sub = cat.subcategories.find(s => s.slug === slug);
    if (sub) return { subcategory: sub, category: cat };
  }
  return null;
};
