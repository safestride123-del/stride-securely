import { motion } from "framer-motion";
import { User, Phone, Shield, Bell, Moon, MapPin, Lock, Download, Trash2, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", path: "/profile" },
      { icon: Phone, label: "Emergency Contacts", path: "/emergency-contacts" },
      { icon: Key, label: "Change Password", action: "password" },
    ],
  },
  {
    title: "Safety",
    items: [
      { icon: Shield, label: "SOS Custom Message", action: "sos-message" },
      { icon: Bell, label: "Auto Voice Recording", action: "toggle-voice" },
      { icon: MapPin, label: "Location Sensitivity", action: "location" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Moon, label: "Dark Mode", action: "dark-mode" },
      { icon: Lock, label: "Privacy Controls", action: "privacy" },
    ],
  },
  {
    title: "Data",
    items: [
      { icon: Download, label: "Download My Data", action: "download" },
      { icon: Trash2, label: "Delete Account", action: "delete", destructive: true },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    toast.info("This feature is coming soon!");
  };

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-xl text-foreground">Settings</h2>

      {settingsGroups.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.08 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {group.title}
          </p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
            {group.items.map((item, i) => (
              <button
                key={item.label}
                onClick={() => (item as any).path ? navigate((item as any).path) : handleAction((item as any).action)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary transition-colors ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <item.icon
                  size={20}
                  className={(item as any).destructive ? "text-destructive" : "text-primary"}
                />
                <span className={`font-medium text-sm ${(item as any).destructive ? "text-destructive" : "text-foreground"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Settings;
