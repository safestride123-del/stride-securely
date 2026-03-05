import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Phone, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Contact {
  name: string;
  phone: string;
  relation: string;
}

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem("safestride-contacts");
    return saved ? JSON.parse(saved) : [
      { name: "", phone: "", relation: "" },
      { name: "", phone: "", relation: "" },
      { name: "", phone: "", relation: "" },
    ];
  });

  const updateContact = (index: number, field: keyof Contact, value: string) => {
    setContacts((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const addContact = () => {
    if (contacts.length >= 5) return toast.error("Maximum 5 contacts");
    setContacts([...contacts, { name: "", phone: "", relation: "" }]);
  };

  const removeContact = (index: number) => {
    if (contacts.length <= 3) return toast.error("Minimum 3 contacts required");
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const valid = contacts.every((c) => c.name && c.phone);
    if (!valid) return toast.error("Please fill all contact details");
    localStorage.setItem("safestride-contacts", JSON.stringify(contacts));
    toast.success("Emergency contacts saved!");
  };

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground">
        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
      </button>

      <div>
        <h2 className="font-display font-bold text-xl text-foreground">Emergency Contacts</h2>
        <p className="text-muted-foreground text-sm mt-1">These contacts will be alerted during SOS</p>
      </div>

      {contacts.map((contact, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-primary">Contact {i + 1}</span>
            {contacts.length > 3 && (
              <button onClick={() => removeContact(i)} className="text-destructive">
                <Trash2 size={16} />
              </button>
            )}
          </div>
          <input
            placeholder="Name"
            value={contact.name}
            onChange={(e) => updateContact(i, "name", e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            placeholder="Phone"
            type="tel"
            value={contact.phone}
            onChange={(e) => updateContact(i, "phone", e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            placeholder="Relation (e.g., Mother, Friend)"
            value={contact.relation}
            onChange={(e) => updateContact(i, "relation", e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </motion.div>
      ))}

      <button
        onClick={addContact}
        className="w-full border-2 border-dashed border-border rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <Plus size={18} /> Add Contact
      </button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        className="w-full gradient-hero text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
      >
        <Save size={18} /> Save Contacts
      </motion.button>
    </div>
  );
};

export default EmergencyContacts;
