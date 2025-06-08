import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const courses = [
  {
    id: 1,
    title: "JavaScript Advanced",
    description:
      "Углубленное изучение современного JavaScript, ES6+, асинхронность",
    level: "Продвинутый",
    duration: "40 часов",
    tests: 12,
    icon: "Code2",
  },
  {
    id: 2,
    title: "React & TypeScript",
    description: "Разработка современных веб-приложений с React и TypeScript",
    level: "Средний",
    duration: "35 часов",
    tests: 10,
    icon: "Component",
  },
  {
    id: 3,
    title: "Node.js Backend",
    description: "Серверная разработка на Node.js, Express, базы данных",
    level: "Средний",
    duration: "45 часов",
    tests: 15,
    icon: "Server",
  },
  {
    id: 4,
    title: "Python для аналитики",
    description: "Анализ данных с Python, pandas, numpy, машинное обучение",
    level: "Начальный",
    duration: "30 часов",
    tests: 8,
    icon: "BarChart3",
  },
  {
    id: 5,
    title: "DevOps практики",
    description: "Docker, Kubernetes, CI/CD, мониторинг и деплой приложений",
    level: "Продвинутый",
    duration: "50 часов",
    tests: 18,
    icon: "Settings",
  },
  {
    id: 6,
    title: "Алгоритмы и структуры данных",
    description: "Основы алгоритмов, сложность, оптимизация кода",
    level: "Средний",
    duration: "25 часов",
    tests: 20,
    icon: "Network",
  },
];

const CourseGrid = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Начальный":
        return "bg-green-100 text-green-800";
      case "Средний":
        return "bg-yellow-100 text-yellow-800";
      case "Продвинутый":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Курсы повышения квалификации
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите направление для развития ваших профессиональных навыков
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon
                      name={course.icon as any}
                      size={20}
                      className="text-purple-600"
                    />
                  </div>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="text-sm">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Icon name="Clock" size={16} className="mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Icon name="FileText" size={16} className="mr-1" />
                    {course.tests} тестов
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Начать курс
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseGrid;
