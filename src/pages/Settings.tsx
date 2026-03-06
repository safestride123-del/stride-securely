import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Shield, Bell, Moon, MapPin, Lock, Download, Trash2, Key, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
      setProfile(data);
      setLoading(false);
    });
  }, [user]);

  const toggleSetting = async (field: string) => {
    if (!user || !profile) return;
    const newValue = !profile[field];
    const { error } = await supabase.from("profiles").update({ [field]: newValue }).eq("id", user.id);
    if (error) return toast.error("Failed to update setting");
    setProfile({ ...profile, [field]: newValue });
    toast.success("Setting updated!");
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return toast.error(error.message);
    toast.success("Password updated!");
    setChangingPassword(false);
    setNewPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out!");
    navigate("/auth");
  };

  const handleDeleteAccount = async () => {
    toast.error("Please contact support to delete your account.");
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", onClick: () => navigate("/profile") },
        { icon: Phone, label: "Emergency Contacts", onClick: () => navigate("/emergency-contacts") },
        { icon: Key, label: "Change Password", onClick: () => setChangingPassword(!changingPassword) },
      ],
    },
    {
      title: "Safety",
      items: [
        { icon: Shield, label: "SOS Custom Message", onClick: () => toast.info("Coming soon!") },
        {
          icon: Bell, label: "Notifications",
          toggle: true, value: profile?.notification_enabled,
          onClick: () => toggleSetting("notification_enabled"),
        },
        {
          icon: MapPin, label: "Location Access",
          toggle: true, value: profile?.location_enabled,
          onClick: () => toggleSetting("location_enabled"),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Moon, label: "Dark Mode",
          toggle: true, value: profile?.dark_mode,
          onClick: () => toggleSetting("dark_mode"),
        },
        { icon: Lock, label: "Privacy Controls", onClick: () => toast.info("Coming soon!") },
      ],
    },
    {
      title: "Data & Account",
      items: [
        { icon: Download, label: "Download My Data", onClick: () => toast.info("Coming soon!") },
        { icon: Trash2, label: "Delete Account", onClick: handleDeleteAccount, destructive: true },
        { icon: LogOut, label: "Log Out", onClick: handleLogout, destructive: true },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

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
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary transition-colors ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <item.icon size={20} className={(item as any).destructive ? "text-destructive" : "text-primary"} />
                <span className={`font-medium text-sm flex-1 ${(item as any).destructive ? "text-destructive" : "text-foreground"}`}>
                  {item.label}
                </span>
                {(item as any).toggle && (
                  <div className={`w-10 h-6 rounded-full transition-colors ${(item as any).value ? "bg-primary" : "bg-muted"} relative`}>
                    <div className={`absolute top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform ${(item as any).value ? "left-5" : "left-1"}`} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      ))}

      {changingPassword && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <p className="text-xs font-semibold text-primary uppercase">New Password</p>
          <input
            type="password" placeholder="Min 6 characters" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={handleChangePassword} className="w-full gradient-hero text-primary-foreground py-2.5 rounded-xl font-semibold text-sm">
            Update Password
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
