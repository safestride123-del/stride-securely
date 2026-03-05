import { motion } from "framer-motion";
import { GraduationCap, Building, BookOpen, Users, FileText, Compass } from "lucide-react";

const sections = [
  { icon: GraduationCap, title: "Scholarships", desc: "Financial aid for women students", count: "50+" },
  { icon: Building, title: "Government Schemes", desc: "Central & state schemes for women", count: "30+" },
  { icon: BookOpen, title: "Internships", desc: "Verified opportunities for women", count: "120+" },
  { icon: Users, title: "Mentorship", desc: "Connect with industry professionals", count: "Free" },
  { icon: FileText, title: "Resume Builder", desc: "Create a professional resume", count: "AI" },
  { icon: Compass, title: "Career Roadmap", desc: "Personalized path guidance", count: "New" },
];

const Career = () => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-xl text-foreground">Career Hub</h2>
        <p className="text-muted-foreground text-sm mt-1">Empowering your professional journey</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sections.map((section, i) => (
          <motion.button
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-2xl p-4 text-left shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center mb-3">
              <section.icon size={20} className="text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{section.desc}</p>
            <span className="inline-block mt-2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {section.count}
            </span>
          </motion.button>
        ))}
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
