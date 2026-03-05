import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || "",
    phone: "",
    bloodGroup: "O+",
    dob: "",
    gender: "Female",
  });

  const handleSave = () => {
    localStorage.setItem("safestride-profile", JSON.stringify(form));
    toast.success("Profile saved!");
  };

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground">
        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
      </button>

      <div className="gradient-hero rounded-2xl p-6 text-primary-foreground text-center">
        <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <User size={36} />
        </div>
        <h2 className="font-display font-bold text-lg">{form.name || "Your Name"}</h2>
        <p className="text-primary-foreground/70 text-sm">{user?.email}</p>
      </div>

      <div className="space-y-3">
        {[
          { label: "Full Name", key: "name", type: "text" },
          { label: "Phone Number", key: "phone", type: "tel" },
          { label: "Date of Birth", key: "dob", type: "date" },
          { label: "Blood Group", key: "bloodGroup", type: "text" },
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
          className="w-full gradient-hero text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Save size={18} /> Save Profile
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
