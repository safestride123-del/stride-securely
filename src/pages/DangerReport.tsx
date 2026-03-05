import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, AlertTriangle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const dangerTypes = ["Harassment", "Poor Lighting", "Suspicious Activity", "Unsafe Area", "Other"];

const DangerReport = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!type || !description || !location) return toast.error("Please fill all fields");
    toast.success("Danger report submitted anonymously. Thank you for keeping others safe!");
    setType("");
    setDescription("");
    setLocation("");
  };

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground">
        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
      </button>

      <div>
        <h2 className="font-display font-bold text-xl text-foreground">Report Danger</h2>
        <p className="text-muted-foreground text-sm mt-1">Anonymous reporting to keep everyone safe</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Type of Danger
          </label>
          <div className="flex flex-wrap gap-2">
            {dangerTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  type === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            Location
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Describe or enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            Description
          </label>
          <textarea
            placeholder="Describe what happened..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full gradient-hero text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Send size={18} /> Submit Report
        </motion.button>
      </div>
    </div>
  );
};

export default DangerReport;
