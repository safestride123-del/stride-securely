import { Menu, User, Edit, Phone, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = [
  { icon: User, label: "My Profile", path: "/profile" },
  { icon: Edit, label: "Edit Details", path: "/settings" },
  { icon: Phone, label: "Emergency Contacts", path: "/emergency-contacts" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/auth");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl hover:bg-secondary transition-colors"
      >
        <Menu size={24} className="text-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card shadow-elevated p-6 flex flex-col"
            >
              <div className="gradient-hero rounded-2xl p-5 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-3">
                  <User size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-primary-foreground font-display font-bold text-lg">
                  SafeStride User
                </h3>
                <p className="text-primary-foreground/70 text-sm">Stay safe, stay strong</p>
              </div>

              <div className="flex-1 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
                  >
                    <item.icon size={20} className="text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 transition-colors text-destructive"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileMenu;
