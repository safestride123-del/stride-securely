import { useState, useEffect } from "react";

interface ProgressData {
  completedLessons: string[];
  quizScores: Record<string, number>;
  xp: number;
  streak: number;
  lastActiveDate: string;
  badges: string[];
}

const DEFAULT_PROGRESS: ProgressData = {
  completedLessons: [],
  quizScores: {},
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  badges: [],
};

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem("safestride-progress");
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem("safestride-progress", JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (lessonId: string, xpEarned: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const today = new Date().toDateString();
      const wasActiveYesterday =
        prev.lastActiveDate === new Date(Date.now() - 86400000).toDateString();
      const newStreak = wasActiveYesterday ? prev.streak + 1 : prev.lastActiveDate === today ? prev.streak : 1;

      const newXp = prev.xp + xpEarned;
      const newBadges = [...prev.badges];
      const completedCount = prev.completedLessons.length + 1;

      if (completedCount === 1 && !newBadges.includes("first-lesson")) newBadges.push("first-lesson");
      if (completedCount === 7 && !newBadges.includes("week-warrior")) newBadges.push("week-warrior");
      if (newStreak >= 3 && !newBadges.includes("streak-3")) newBadges.push("streak-3");
      if (newStreak >= 7 && !newBadges.includes("streak-7")) newBadges.push("streak-7");

      return {
        completedLessons: [...prev.completedLessons, lessonId],
        quizScores: prev.quizScores,
        xp: newXp,
        streak: newStreak,
        lastActiveDate: today,
        badges: newBadges,
      };
    });
  };

  const saveQuizScore = (lessonId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [lessonId]: score },
    }));
  };

  return { progress, completeLesson, saveQuizScore };
};
