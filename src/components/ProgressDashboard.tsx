import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Icon from "@/components/ui/icon";
import { ProgressData } from "@/pages/Index";

interface ProgressDashboardProps {
  progress: ProgressData;
}

const ProgressDashboard = ({ progress }: ProgressDashboardProps) => {
  // Подсчитываем статистику
  const totalTests = progress.completedTests.length;
  const averageScore =
    progress.totalQuestions > 0
      ? Math.round((progress.totalCorrect / progress.totalQuestions) * 100)
      : 0;

  // Создаем данные для графика последних недель
  const weeklyData = [];
  for (let i = 4; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekTests = progress.completedTests.filter((test) => {
      const testDate = new Date(test.completedAt);
      return testDate >= weekStart && testDate <= weekEnd;
    });

    const weekScore =
      weekTests.length > 0
        ? Math.round(
            (weekTests.reduce((sum, test) => sum + test.score, 0) /
              weekTests.reduce((sum, test) => sum + test.totalQuestions, 0)) *
              100,
          )
        : 0;

    weeklyData.push({
      name: `Неделя ${5 - i}`,
      score: weekScore,
    });
  }

  // Подсчитываем навыки по типам тестов
  const skillsData = [
    {
      skill: "JavaScript",
      level:
        progress.completedTests
          .filter((test) => test.testId === "javascript")
          .reduce(
            (acc, test, _, arr) =>
              arr.length > 0
                ? acc +
                  Math.round((test.score / test.totalQuestions) * 100) /
                    arr.length
                : 0,
            0,
          ) || 0,
    },
    {
      skill: "React",
      level:
        progress.completedTests
          .filter((test) => test.testId === "react")
          .reduce(
            (acc, test, _, arr) =>
              arr.length > 0
                ? acc +
                  Math.round((test.score / test.totalQuestions) * 100) /
                    arr.length
                : 0,
            0,
          ) || 0,
    },
    {
      skill: "Node.js",
      level:
        progress.completedTests
          .filter((test) => test.testId === "node")
          .reduce(
            (acc, test, _, arr) =>
              arr.length > 0
                ? acc +
                  Math.round((test.score / test.totalQuestions) * 100) /
                    arr.length
                : 0,
            0,
          ) || 0,
    },
  ].filter((skill) => skill.level > 0);

  // Последние достижения
  const recentAchievements = [];

  if (progress.streak >= 7) {
    recentAchievements.push({
      title: "Постоянство",
      description: `${progress.streak} дней подряд обучения`,
      icon: "Flame",
      date: "Сегодня",
    });
  }

  if (totalTests >= 1) {
    recentAchievements.push({
      title: "Первый тест",
      description: "Прошли первое тестирование",
      icon: "Trophy",
      date: "Недавно",
    });
  }

  if (averageScore >= 90) {
    recentAchievements.push({
      title: "Отличник",
      description: "Средний балл выше 90%",
      icon: "Star",
      date: "Недавно",
    });
  }
  return (
    <section id="progress" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ваш прогресс
          </h2>
          <p className="text-xl text-gray-600">
            Отслеживайте свое развитие и достижения
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Icon
                  name="Target"
                  size={20}
                  className="mr-2 text-purple-600"
                />
                Общий прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {averageScore}%
              </div>
              <Progress value={averageScore} className="mb-2" />
              <p className="text-sm text-gray-600">
                {totalTests} тестов пройдено
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Icon
                  name="Calendar"
                  size={20}
                  className="mr-2 text-green-600"
                />
                Активность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {progress.streak}
              </div>
              <p className="text-sm text-gray-600 mb-2">дней обучения подряд</p>
              <Badge className="bg-green-100 text-green-800">
                {progress.streak >= 7
                  ? "Отличный темп!"
                  : progress.streak >= 3
                    ? "Хороший темп"
                    : "Продолжайте!"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Icon name="Award" size={20} className="mr-2 text-yellow-600" />
                Достижения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {recentAchievements.length}
              </div>
              <p className="text-sm text-gray-600 mb-2">значков получено</p>
              <Badge className="bg-yellow-100 text-yellow-800">
                {recentAchievements.length >= 3 ? "Коллекционер" : "В процессе"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Динамика результатов</CardTitle>
              <CardDescription>
                Средний балл по тестам за последние недели
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#9b87f5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Навыки и компетенции</CardTitle>
              <CardDescription>
                Ваш уровень владения технологиями
              </CardDescription>
            </CardHeader>
            <CardContent>
              {skillsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={skillsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="skill" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="level" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-500">
                  Пройдите тесты, чтобы увидеть свои навыки
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Последние достижения</CardTitle>
            <CardDescription>Ваши успехи в обучении</CardDescription>
          </CardHeader>
          <CardContent>
            {recentAchievements.length > 0 ? (
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Icon
                        name={achievement.icon as any}
                        size={20}
                        className="text-purple-600"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {achievement.date}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Пройдите тесты, чтобы получить первые достижения!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProgressDashboard;
