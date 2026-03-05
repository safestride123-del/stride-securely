import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Circle, Play } from "lucide-react";
import { courses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgress();

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <p className="text-center text-muted-foreground mt-10">Course not found</p>;

  return (
    <div className="space-y-4">
      <button onClick={() => navigate("/courses")} className="flex items-center gap-2 text-muted-foreground">
        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
      </button>

      <div className="gradient-hero rounded-2xl p-5 text-primary-foreground">
        <p className="text-4xl mb-2">{course.emoji}</p>
        <h2 className="font-display font-bold text-xl">{course.title}</h2>
        <p className="text-primary-foreground/70 text-sm mt-1">{course.description}</p>
        <div className="mt-3 flex gap-3 text-sm">
          <span className="bg-primary-foreground/15 px-3 py-1 rounded-full">
            {course.lessons.filter((l) => progress.completedLessons.includes(l.id)).length}/{course.lessons.length} done
          </span>
          <span className="bg-primary-foreground/15 px-3 py-1 rounded-full">
            {course.difficulty}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {course.lessons.map((lesson, i) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const isLocked = i > 0 && !progress.completedLessons.includes(course.lessons[i - 1].id);

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !isLocked && navigate(`/lesson/${courseId}/${lesson.id}`)}
              disabled={isLocked}
              className={`w-full bg-card border border-border rounded-xl p-4 text-left flex items-center gap-4 ${
                isLocked ? "opacity-40" : "hover:shadow-card"
              } transition-shadow`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isCompleted ? "bg-safe" : "bg-secondary"
              }`}>
                {isCompleted ? (
                  <CheckCircle size={20} className="text-safe-foreground" />
                ) : (
                  <Play size={18} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Day {lesson.day}</p>
                <p className="font-semibold text-sm text-foreground">{lesson.title}</p>
              </div>
              <span className="text-xs font-semibold text-primary">+{lesson.xp} XP</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetail;
