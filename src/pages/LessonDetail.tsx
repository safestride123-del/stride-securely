import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, HelpCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { progress, completeLesson, saveQuizScore } = useProgress();
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const course = courses.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);

  if (!lesson || !course) return <p className="text-muted-foreground text-center mt-10">Lesson not found</p>;

  const isCompleted = progress.completedLessons.includes(lesson.id);

  const handleQuizSubmit = () => {
    if (quizAnswer === null) return;
    setQuizSubmitted(true);
    const isCorrect = quizAnswer === lesson.quiz.correctIndex;
    saveQuizScore(lesson.id, isCorrect ? 100 : 0);
    if (isCorrect) {
      toast.success("Correct! 🎉");
    } else {
      toast.error("Not quite right. Review the lesson and try again!");
    }
  };

  const handleComplete = () => {
    completeLesson(lesson.id, lesson.xp);
    toast.success(`+${lesson.xp} XP earned! 🏆`);
  };

  return (
    <div className="space-y-5 pb-8">
      <button onClick={() => navigate(`/courses/${courseId}`)} className="flex items-center gap-2 text-muted-foreground">
        <ArrowLeft size={20} /> <span className="text-sm font-medium">Day {lesson.day}</span>
      </button>

      <div>
        <h2 className="font-display font-bold text-xl text-foreground">{lesson.title}</h2>
        <p className="text-muted-foreground text-sm mt-1">{lesson.situation}</p>
      </div>

      {/* Video Player */}
      <div className="aspect-video rounded-2xl overflow-hidden bg-secondary">
        <iframe
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Steps */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <span className="text-primary">📋</span> Defense Steps
        </h3>
        {lesson.steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-foreground">{step}</p>
          </div>
        ))}
      </div>

      {/* Safety Warning */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex gap-3">
        <AlertTriangle size={20} className="text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-destructive">Safety Warning</p>
          <p className="text-sm text-foreground mt-1">{lesson.safetyWarning}</p>
        </div>
      </div>

      {/* Practice Tip */}
      <div className="bg-safe/10 border border-safe/20 rounded-2xl p-4 flex gap-3">
        <Lightbulb size={20} className="text-safe shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-safe">Practice Tip</p>
          <p className="text-sm text-foreground mt-1">{lesson.practiceTip}</p>
        </div>
      </div>

      {/* Quiz */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <HelpCircle size={18} className="text-primary" /> Quiz
        </h3>
        <p className="text-sm font-medium text-foreground">{lesson.quiz.question}</p>
        <div className="space-y-2">
          {lesson.quiz.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !quizSubmitted && setQuizAnswer(i)}
              disabled={quizSubmitted}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                quizSubmitted && i === lesson.quiz.correctIndex
                  ? "bg-safe/15 border-safe text-safe"
                  : quizSubmitted && i === quizAnswer && i !== lesson.quiz.correctIndex
                  ? "bg-destructive/15 border-destructive text-destructive"
                  : quizAnswer === i
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground hover:border-primary/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {!quizSubmitted && (
          <button
            onClick={handleQuizSubmit}
            disabled={quizAnswer === null}
            className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold disabled:opacity-40 transition-opacity"
          >
            Submit Answer
          </button>
        )}
      </div>

      {/* Complete Button */}
      {!isCompleted ? (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleComplete}
          className="w-full gradient-hero text-primary-foreground py-4 rounded-2xl font-display font-bold text-lg shadow-elevated"
        >
          ✅ Mark as Completed (+{lesson.xp} XP)
        </motion.button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-4 text-safe font-semibold">
          <CheckCircle size={22} /> Lesson Completed!
        </div>
      )}
    </div>
  );
};

export default LessonDetail;
