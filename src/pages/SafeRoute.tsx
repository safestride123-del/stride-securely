import { motion } from "framer-motion";
import { Map, Navigation, Shield, AlertTriangle, Hospital, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SafeRoute = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!from || !to) return toast.error("Enter both locations");
    setSearched(true);
    toast.success("Route calculated! Showing safest path.");
  };

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-xl text-foreground">Safe Route Navigator</h2>

      <div className="space-y-3">
        <div className="relative">
          <Navigation size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-safe" />
          <input
            placeholder="Current location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="relative">
          <Map size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          <input
            placeholder="Destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full gradient-hero text-primary-foreground py-3 rounded-xl font-semibold"
        >
          Find Safest Route
        </button>
      </div>

      {searched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Map Placeholder */}
          <div className="aspect-[4/3] bg-secondary rounded-2xl flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <Map size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Map View</p>
              <p className="text-xs">Connect Google Maps API for live routing</p>
            </div>
          </div>

          {/* Safety Score */}
          <div className="bg-safe/10 border border-safe/30 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-safe rounded-2xl flex items-center justify-center">
              <Shield size={28} className="text-safe-foreground" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-safe">87%</p>
              <p className="text-sm text-foreground">Safety Score</p>
            </div>
          </div>

          {/* Nearby Services */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Building2, label: "2 Police Stations", color: "text-primary" },
              { icon: Hospital, label: "3 Hospitals", color: "text-safe" },
              { icon: AlertTriangle, label: "1 Alert Zone", color: "text-warning" },
              { icon: Shield, label: "Well-lit route", color: "text-safe" },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-xl p-3 flex items-center gap-2">
                <item.icon size={18} className={item.color} />
                <span className="text-xs font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SafeRoute;
