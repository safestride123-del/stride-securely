import { motion } from "framer-motion";
import { Gift, Award, Shield, Star, Zap } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const allBadges = [
  { id: "first-lesson", name: "First Step", description: "Complete your first lesson", icon: "🥇", xpReq: 50 },
  { id: "week-warrior", name: "Week Warrior", description: "Complete the 7-day course", icon: "⚔️", xpReq: 350 },
  { id: "streak-3", name: "Consistent Learner", description: "3-day learning streak", icon: "🔥", xpReq: 0 },
  { id: "streak-7", name: "Fearless Defender", description: "7-day learning streak", icon: "🛡️", xpReq: 0 },
  { id: "safe-navigator", name: "Safe Navigator", description: "Use safe route 5 times", icon: "🗺️", xpReq: 0 },
  { id: "night-walker", name: "Night Navigator", description: "Complete night safety module", icon: "🌙", xpReq: 0 },
];

const Rewards = () => {
  const { progress } = useProgress();

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-xl text-foreground">Rewards & Badges</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-hero rounded-2xl p-5 text-primary-foreground flex items-center gap-4"
      >
        <div className="w-14 h-14 bg-primary-foreground/15 rounded-2xl flex items-center justify-center">
          <Zap size={28} />
        </div>
        <div>
          <p className="text-3xl font-display font-bold">{progress.xp}</p>
          <p className="text-primary-foreground/70 text-sm">Total XP Earned</p>
        </div>
      </motion.div>

      <div>
        <h3 className="font-display font-semibold text-foreground mb-3">Your Badges</h3>
        <div className="grid grid-cols-2 gap-3">
          {allBadges.map((badge, i) => {
            const earned = progress.badges.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-card border rounded-2xl p-4 text-center shadow-card ${
                  earned ? "border-primary" : "border-border opacity-50"
                }`}
              >
                <span className="text-3xl">{badge.icon}</span>
                <p className="font-semibold text-sm text-foreground mt-2">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                {earned && (
                  <span className="inline-block mt-2 text-[10px] font-semibold text-safe bg-safe/15 px-2 py-0.5 rounded-full">
                    Earned ✓
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
