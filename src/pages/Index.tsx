import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseGrid from "@/components/CourseGrid";
import TestSelector from "@/components/TestSelector";
import TestSection from "@/components/TestSection";
import ProgressDashboard from "@/components/ProgressDashboard";

export interface TestResult {
  testId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

export interface ProgressData {
  completedTests: TestResult[];
  totalCorrect: number;
  totalQuestions: number;
  streak: number;
  lastTestDate: Date | null;
}

const Index = () => {
  const [progress, setProgress] = useState<ProgressData>({
    completedTests: [],
    totalCorrect: 0,
    totalQuestions: 0,
    streak: 0,
    lastTestDate: null,
  });

  // Загружаем прогресс из localStorage при монтировании
  useEffect(() => {
    const savedProgress = localStorage.getItem("learningProgress");
    if (savedProgress) {
      const parsedProgress = JSON.parse(savedProgress);
      // Преобразуем даты обратно в объекты Date
      setProgress({
        ...parsedProgress,
        lastTestDate: parsedProgress.lastTestDate
          ? new Date(parsedProgress.lastTestDate)
          : null,
        completedTests: parsedProgress.completedTests.map((test: any) => ({
          ...test,
          completedAt: new Date(test.completedAt),
        })),
      });
    }
  }, []);

  // Сохраняем прогресс в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("learningProgress", JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (
    testId: string,
    score: number,
    totalQuestions: number,
  ) => {
    const now = new Date();
    const newTestResult: TestResult = {
      testId,
      score,
      totalQuestions,
      completedAt: now,
    };

    setProgress((prev) => {
      // Проверяем, не проходил ли уже этот тест сегодня
      const existingTestToday = prev.completedTests.find(
        (test) =>
          test.testId === testId &&
          test.completedAt.toDateString() === now.toDateString(),
      );

      let newCompletedTests;
      if (existingTestToday) {
        // Обновляем результат теста за сегодня
        newCompletedTests = prev.completedTests.map((test) =>
          test.testId === testId &&
          test.completedAt.toDateString() === now.toDateString()
            ? newTestResult
            : test,
        );
      } else {
        // Добавляем новый результат
        newCompletedTests = [...prev.completedTests, newTestResult];
      }

      // Подсчитываем общую статистику
      const totalCorrect = newCompletedTests.reduce(
        (sum, test) => sum + test.score,
        0,
      );
      const totalQuestions = newCompletedTests.reduce(
        (sum, test) => sum + test.totalQuestions,
        0,
      );

      // Подсчитываем streak (дни подряд)
      const sortedTests = newCompletedTests.sort(
        (a, b) => b.completedAt.getTime() - a.completedAt.getTime(),
      );

      let streak = 0;
      let currentDate = new Date();

      for (let i = 0; i < 30; i++) {
        const hasTestOnDate = sortedTests.some(
          (test) =>
            test.completedAt.toDateString() === currentDate.toDateString(),
        );

        if (hasTestOnDate) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return {
        completedTests: newCompletedTests,
        totalCorrect,
        totalQuestions,
        streak,
        lastTestDate: now,
      };
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CourseGrid />
      <TestSelector onTestComplete={updateProgress} />
      <TestSection />
      <ProgressDashboard progress={progress} />
    </div>
  );
};

export default Index;
