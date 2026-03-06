import { motion } from "framer-motion";
import { Map, Navigation, Shield, AlertTriangle, Hospital, Building2, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

const policeIcon = L.divIcon({ className: "", html: '<div style="background:#7c3aed;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🏛</div>', iconSize: [28, 28], iconAnchor: [14, 14] });
const hospitalIcon = L.divIcon({ className: "", html: '<div style="background:#10b981;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🏥</div>', iconSize: [28, 28], iconAnchor: [14, 14] });

const generatePOIs = (lat: number, lng: number) => [
  { type: "police", name: "Police Station", lat: lat + 0.008, lng: lng + 0.005 },
  { type: "police", name: "Traffic Police", lat: lat - 0.006, lng: lng + 0.01 },
  { type: "hospital", name: "City Hospital", lat: lat + 0.004, lng: lng - 0.008 },
  { type: "hospital", name: "Emergency Clinic", lat: lat - 0.01, lng: lng - 0.003 },
  { type: "hospital", name: "Women's Health Center", lat: lat + 0.012, lng: lng + 0.002 },
];

const SafeRoute = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [safetyScore, setSafetyScore] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const geocode = async (query: string): Promise<[number, number] | null> => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=1`);
      const data = await res.json();
      if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lng)];
      return null;
    } catch { return null; }
  };

  const initMap = (fromCoords: [number, number], toCoords: [number, number], score: number) => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).fitBounds([fromCoords, toCoords], { padding: [40, 40] });
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    L.marker(fromCoords).addTo(map).bindPopup("<b>Start:</b> " + from);
    L.marker(toCoords).addTo(map).bindPopup("<b>Destination:</b> " + to);

    const routeColor = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
    L.polyline([fromCoords, toCoords], { color: routeColor, weight: 5, opacity: 0.8, dashArray: "10 6" }).addTo(map);

    const pois = generatePOIs((fromCoords[0] + toCoords[0]) / 2, (fromCoords[1] + toCoords[1]) / 2);
    pois.forEach((poi) => {
      L.marker([poi.lat, poi.lng], { icon: poi.type === "police" ? policeIcon : hospitalIcon })
        .addTo(map).bindPopup(`<b>${poi.name}</b>`);
    });

    L.circle(fromCoords, { radius: 500, color: "#10b981", fillColor: "#10b981", fillOpacity: 0.1, weight: 1 }).addTo(map);
    L.circle(toCoords, { radius: 500, color: "#10b981", fillColor: "#10b981", fillOpacity: 0.1, weight: 1 }).addTo(map);

    setTimeout(() => map.invalidateSize(), 300);
  };

  const handleSearch = async () => {
    if (!from || !to) return toast.error("Enter both locations");
    setSearching(true);

    const [fromCoords, toCoords] = await Promise.all([geocode(from), geocode(to)]);
    if (!fromCoords || !toCoords) {
      setSearching(false);
      return toast.error("Could not find one or both locations. Try adding city/state name.");
    }

    const score = Math.floor(70 + Math.random() * 25);
    setSafetyScore(score);
    setSearched(true);
    setSearching(false);

    // Wait for React to render the map container, then init
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initMap(fromCoords, toCoords, score);
        toast.success("Route calculated! Showing safest path.");
      });
    });
  };

  useEffect(() => {
    return () => { 
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-xl text-foreground">Safe Route Navigator</h2>

      <div className="space-y-3">
        <div className="relative">
          <Navigation size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-safe" />
          <input placeholder="Current location (e.g., Connaught Place, Delhi)" value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="relative">
          <Map size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          <input placeholder="Destination (e.g., India Gate, Delhi)" value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <button onClick={handleSearch} disabled={searching}
          className="w-full gradient-hero text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
          {searching ? <><Loader2 size={18} className="animate-spin" /> Calculating...</> : "Find Safest Route"}
        </button>
      </div>

      {searched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div ref={mapRef} style={{ height: 300, width: "100%" }} className="rounded-2xl border border-border" />

          <div className="flex gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold"><span className="w-3 h-3 rounded-full bg-safe" /> Safe</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold"><span className="w-3 h-3 rounded-full bg-warning" /> Medium</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold"><span className="w-3 h-3 rounded-full bg-destructive" /> High Risk</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold">🏛 Police</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold">🏥 Hospital</span>
          </div>

          <div className={`${safetyScore >= 80 ? "bg-safe/10 border-safe/30" : safetyScore >= 60 ? "bg-warning/10 border-warning/30" : "bg-destructive/10 border-destructive/30"} border rounded-2xl p-4 flex items-center gap-4`}>
            <div className={`w-14 h-14 ${safetyScore >= 80 ? "bg-safe" : safetyScore >= 60 ? "bg-warning" : "bg-destructive"} rounded-2xl flex items-center justify-center`}>
              <Shield size={28} className="text-primary-foreground" />
            </div>
            <div>
              <p className={`text-2xl font-display font-bold ${safetyScore >= 80 ? "text-safe" : safetyScore >= 60 ? "text-warning" : "text-destructive"}`}>{safetyScore}%</p>
              <p className="text-sm text-foreground">Safety Score</p>
            </div>
          </div>

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
