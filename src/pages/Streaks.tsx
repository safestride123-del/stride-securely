import { motion } from "framer-motion";
import { Flame, Star, Calendar } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const Streaks = () => {
  const { progress } = useProgress();

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-xl text-foreground">Your Streaks</h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-hero rounded-3xl p-8 text-center text-primary-foreground"
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Flame size={64} className="mx-auto mb-3" />
        </motion.div>
        <p className="text-5xl font-display font-bold">{progress.streak}</p>
        <p className="text-primary-foreground/70 mt-1">Day Streak</p>
      </motion.div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star size={18} className="text-warning" /> Milestones
        </h3>
        <div className="space-y-3">
          {[
            { days: 3, label: "3-Day Warrior", earned: progress.streak >= 3 },
            { days: 7, label: "Week Champion", earned: progress.streak >= 7 },
            { days: 14, label: "Fortnight Fighter", earned: progress.streak >= 14 },
            { days: 30, label: "Monthly Master", earned: progress.streak >= 30 },
          ].map((milestone) => (
            <div key={milestone.days} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                milestone.earned ? "gradient-primary" : "bg-secondary"
              }`}>
                <span className="text-sm">{milestone.earned ? "🏆" : "🔒"}</span>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${milestone.earned ? "text-foreground" : "text-muted-foreground"}`}>
                  {milestone.label}
                </p>
                <p className="text-xs text-muted-foreground">{milestone.days} day streak</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
          <Calendar size={18} className="text-primary" /> This Week
        </h3>
        <div className="flex justify-between mt-3">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i < progress.streak ? "gradient-primary" : "bg-secondary"
              }`}>
                {i < progress.streak && <span className="text-xs">🔥</span>}
              </div>
              <span className="text-[10px] text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streaks;
