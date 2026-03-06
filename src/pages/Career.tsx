import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Building, BookOpen, Users, FileText, Compass, ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const categoryConfig: Record<string, { icon: any; label: string; color: string }> = {
  scholarship: { icon: GraduationCap, label: "Scholarships", color: "text-primary" },
  government_scheme: { icon: Building, label: "Government Schemes", color: "text-safe" },
  internship: { icon: BookOpen, label: "Internships", color: "text-accent-foreground" },
  mentorship: { icon: Users, label: "Mentorship", color: "text-primary" },
  resume_builder: { icon: FileText, label: "Resume Builder", color: "text-primary" },
  career_roadmap: { icon: Compass, label: "Career Roadmap", color: "text-safe" },
};

interface CareerResource {
  id: string;
  category: string;
  title: string;
  description: string | null;
  details: string | null;
  eligibility: string | null;
  link: string | null;
}

const Career = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resources, setResources] = useState<CareerResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchResources = async (category: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("career_resources")
      .select("*")
      .eq("category", category)
      .order("created_at");
    if (error) {
      toast.error("Failed to load resources");
    } else {
      setResources(data || []);
    }
    setLoading(false);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setExpandedId(null);
    fetchResources(category);
  };

  if (selectedCategory) {
    const config = categoryConfig[selectedCategory];
    const Icon = config?.icon || BookOpen;

    return (
      <div className="space-y-4">
        <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} /> <span className="text-sm font-medium">Back to Career Hub</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Icon size={20} className="text-primary-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">{config?.label}</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No resources available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setExpandedId(expandedId === resource.id ? null : resource.id)}
                  className="w-full p-4 text-left"
                >
                  <h3 className="font-semibold text-sm text-foreground">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                </button>

                <AnimatePresence>
                  {expandedId === resource.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                        {resource.details && (
                          <div>
                            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">Details</p>
                            <p className="text-xs text-foreground leading-relaxed">{resource.details}</p>
                          </div>
                        )}
                        {resource.eligibility && (
                          <div>
                            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">Eligibility</p>
                            <p className="text-xs text-foreground leading-relaxed">{resource.eligibility}</p>
                          </div>
                        )}
                        {resource.link && (
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                          >
                            <ExternalLink size={14} /> Visit Website
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const sections = [
    { key: "scholarship", count: "50+" },
    { key: "government_scheme", count: "30+" },
    { key: "internship", count: "120+" },
    { key: "mentorship", count: "Free" },
    { key: "career_roadmap", count: "New" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-xl text-foreground">Career Hub</h2>
        <p className="text-muted-foreground text-sm mt-1">Empowering your professional journey</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sections.map((section, i) => {
          const config = categoryConfig[section.key];
          const Icon = config.icon;
          return (
            <motion.button
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleCategoryClick(section.key)}
              className="bg-card border border-border rounded-2xl p-4 text-left shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center mb-3">
                <Icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{config.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{config.label}</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {section.count}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="gradient-hero rounded-2xl p-5 text-primary-foreground"
      >
        <h3 className="font-display font-bold">🤖 AI Career Advisor</h3>
        <p className="text-primary-foreground/70 text-sm mt-1">
          Get personalized career suggestions based on your interests and skills
        </p>
        <button className="mt-3 bg-primary-foreground/20 px-4 py-2 rounded-xl text-sm font-semibold">
          Coming Soon
        </button>
      </motion.div>
    </div>
  );
};

export default Career;
