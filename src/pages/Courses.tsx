import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";
import { courses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

const difficultyColors: Record<string, string> = {
  Beginner: "bg-safe text-safe-foreground",
  Intermediate: "bg-warning text-warning-foreground",
  Advanced: "bg-accent text-accent-foreground",
  Expert: "bg-destructive text-destructive-foreground",
};

const Courses = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display font-bold text-xl text-foreground">Self-Defense Courses</h2>
        <p className="text-muted-foreground text-sm mt-1">Learn to protect yourself with daily lessons</p>
      </div>

      {courses.map((course, i) => {
        const completedInCourse = course.lessons.filter((l) =>
          progress.completedLessons.includes(l.id)
        ).length;
        const totalLessons = course.lessons.length;
        const progressPercent = totalLessons > 0 ? (completedInCourse / totalLessons) * 100 : 0;
        const isAvailable = totalLessons > 0;

        return (
          <motion.button
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => isAvailable && navigate(`/courses/${course.id}`)}
            className={`w-full bg-card border border-border rounded-2xl p-5 shadow-card text-left ${
              !isAvailable ? "opacity-50" : "hover:shadow-elevated"
            } transition-shadow`}
            disabled={!isAvailable}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{course.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-foreground">{course.title}</h3>
                  {!isAvailable && <Lock size={14} className="text-muted-foreground" />}
                </div>
                <p className="text-muted-foreground text-sm mb-2">{course.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyColors[course.difficulty]}`}>
                    {course.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{course.days} days</span>
                </div>
                {isAvailable && (
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div
                      className="gradient-primary rounded-full h-1.5 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
                {!isAvailable && (
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                )}
              </div>
              <ChevronRight size={20} className="text-muted-foreground mt-1" />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default Courses;
