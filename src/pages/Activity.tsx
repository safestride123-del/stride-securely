import { motion } from "framer-motion";
import { BookOpen, Map, AlertTriangle, TrendingUp } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const Activity = () => {
  const { progress } = useProgress();

  const stats = [
    { icon: BookOpen, label: "Lessons Completed", value: progress.completedLessons.length, color: "gradient-primary" },
    { icon: Map, label: "Safe Routes Used", value: 0, color: "bg-safe" },
    { icon: AlertTriangle, label: "SOS Alerts", value: 0, color: "bg-destructive" },
    { icon: TrendingUp, label: "Total XP", value: progress.xp, color: "bg-accent" },
  ];

  const progressPercent = Math.min((progress.completedLessons.length / 7) * 100, 100);

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-xl text-foreground">Activity Dashboard</h2>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-4 shadow-card"
          >
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={20} className="text-primary-foreground" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-display font-semibold text-foreground mb-3">Learning Progress</h3>
        <div className="w-full bg-secondary rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="gradient-primary rounded-full h-3"
          />
        </div>
        <p className="text-sm text-muted-foreground">{Math.round(progressPercent)}% of 7-day course completed</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-display font-semibold text-foreground mb-3">Weekly Report</h3>
        <div className="flex justify-between text-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-xs text-muted-foreground">-</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
