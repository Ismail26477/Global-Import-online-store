import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, Moon, Globe, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AppSettingsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  if (!isAuthenticated) { navigate("/login"); return null; }

  return (
    <div className="container py-6 max-w-2xl mx-auto">
      <h1 className="font-heading text-2xl font-bold mb-6">App Settings</h1>

      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-6">
        {/* Dark Mode */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Moon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Switch to dark theme</p>
            </div>
          </div>
          <button
            onClick={() => { setDarkMode(!darkMode); toast.info("Dark mode coming soon!"); }}
            className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Language</p>
              <p className="text-xs text-muted-foreground">Select your preferred language</p>
            </div>
          </div>
          <select value={language} onChange={e => { setLanguage(e.target.value); toast.success("Language updated"); }} className="text-sm border border-border rounded-lg px-2 py-1 bg-background">
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
          </select>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive/30 rounded-xl p-5">
        <h3 className="font-heading font-bold text-sm mb-3 text-destructive">Danger Zone</h3>
        <button onClick={() => toast.info("Account deletion is not available in demo mode")} className="flex items-center gap-2 text-sm text-destructive hover:underline">
          <Trash2 className="w-4 h-4" /> Delete My Account
        </button>
      </div>
    </div>
  );
}
