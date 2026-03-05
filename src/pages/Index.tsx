import { useNavigate } from "react-router-dom";
import { Shield, Map, BookOpen, Briefcase, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";

const quickActions = [
  { icon: Shield, label: "Self Defense", path: "/courses", color: "gradient-primary" },
  { icon: Map, label: "Safe Route", path: "/safe-route", color: "bg-safe" },
  { icon: Briefcase, label: "Career Hub", path: "/career", color: "bg-accent" },
  { icon: AlertTriangle, label: "Danger Report", path: "/report", color: "bg-warning" },
];

const Index = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-hero rounded-3xl p-6 text-primary-foreground"
      >
        <p className="text-primary-foreground/70 text-sm font-medium mb-1">Welcome to</p>
        <h2 className="text-2xl font-display font-bold mb-1">SafeStride</h2>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Securing Her Steps, Shaping Her Future
        </p>
        <div className="flex gap-4">
          <div className="bg-primary-foreground/15 rounded-2xl px-4 py-2 text-center">
            <p className="text-xl font-bold">{progress.xp}</p>
            <p className="text-[10px] text-primary-foreground/70">XP Points</p>
          </div>
          <div className="bg-primary-foreground/15 rounded-2xl px-4 py-2 text-center">
            <p className="text-xl font-bold">🔥 {progress.streak}</p>
            <p className="text-[10px] text-primary-foreground/70">Day Streak</p>
          </div>
          <div className="bg-primary-foreground/15 rounded-2xl px-4 py-2 text-center">
            <p className="text-xl font-bold">{progress.completedLessons.length}</p>
            <p className="text-[10px] text-primary-foreground/70">Lessons</p>
          </div>
        </div>
      </motion.div>

      {/* Courses Card */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onClick={() => navigate("/courses")}
        className="w-full gradient-card border border-border rounded-3xl p-6 shadow-card text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center">
            <BookOpen size={28} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">COURSES</h3>
            <p className="text-muted-foreground text-sm">Self-defense training & empowerment</p>
          </div>
        </div>
      </motion.button>

      {/* Quick Actions */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              onClick={() => navigate(action.path)}
              className="bg-card border border-border rounded-2xl p-4 shadow-card text-left flex flex-col gap-3 hover:shadow-elevated transition-shadow"
            >
              <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center`}>
                <action.icon size={20} className="text-primary-foreground" />
              </div>
              <span className="font-semibold text-sm text-foreground">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Safety Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-secondary rounded-2xl p-4"
      >
        <p className="text-xs font-semibold text-primary mb-1">💡 Daily Safety Tip</p>
        <p className="text-sm text-secondary-foreground">
          Always share your live location with a trusted contact when traveling alone at night.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
