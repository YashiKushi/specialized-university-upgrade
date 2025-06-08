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

const progressData = [
  { name: "Неделя 1", score: 65 },
  { name: "Неделя 2", score: 72 },
  { name: "Неделя 3", score: 78 },
  { name: "Неделя 4", score: 85 },
  { name: "Неделя 5", score: 92 },
];

const skillsData = [
  { skill: "JavaScript", level: 85 },
  { skill: "React", level: 78 },
  { skill: "TypeScript", level: 65 },
  { skill: "Node.js", level: 72 },
  { skill: "Python", level: 45 },
];

const achievements = [
  {
    title: "Первый тест",
    description: "Прошли первое тестирование",
    icon: "Trophy",
    date: "5 дней назад",
  },
  {
    title: "JavaScript Мастер",
    description: "Набрали 90% в тесте JS",
    icon: "Star",
    date: "2 дня назад",
  },
  {
    title: "Постоянство",
    description: "7 дней подряд обучения",
    icon: "Flame",
    date: "Сегодня",
  },
];

const ProgressDashboard = () => {
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
              <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
              <Progress value={78} className="mb-2" />
              <p className="text-sm text-gray-600">3 из 6 курсов завершено</p>
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
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <p className="text-sm text-gray-600 mb-2">дней обучения подряд</p>
              <Badge className="bg-green-100 text-green-800">
                Отличный темп!
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
              <div className="text-3xl font-bold text-yellow-600 mb-2">8</div>
              <p className="text-sm text-gray-600 mb-2">значков получено</p>
              <Badge className="bg-yellow-100 text-yellow-800">
                Коллекционер
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
                <LineChart data={progressData}>
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
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skillsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="skill" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="level" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Последние достижения</CardTitle>
            <CardDescription>Ваши успехи в обучении</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProgressDashboard;
