import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    blood_group: "O+",
    date_of_birth: "",
    gender: "Female",
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setForm({
          full_name: data.full_name || "",
          phone: data.phone || "",
          blood_group: data.blood_group || "O+",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "Female",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return toast.error("Please log in first");
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      ...form,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id);

    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile saved!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground">
        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
      </button>

      <div className="gradient-hero rounded-2xl p-6 text-primary-foreground text-center">
        <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <User size={36} />
        </div>
        <h2 className="font-display font-bold text-lg">{form.full_name || "Your Name"}</h2>
        <p className="text-primary-foreground/70 text-sm">{user?.email}</p>
      </div>

      <div className="space-y-3">
        {[
          { label: "Full Name", key: "full_name", type: "text" },
          { label: "Phone Number", key: "phone", type: "tel" },
          { label: "Date of Birth", key: "date_of_birth", type: "date" },
          { label: "Blood Group", key: "blood_group", type: "text" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
              {field.label}
            </label>
            <input
              type={field.type}
              value={(form as any)[field.key]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        ))}

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            Gender
          </label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full gradient-hero text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving..." : "Save Profile"}
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
