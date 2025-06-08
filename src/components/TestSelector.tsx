import { useState } from "react";
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
import JavaScriptTest from "./tests/JavaScriptTest";
import ReactTest from "./tests/ReactTest";
import NodeTest from "./tests/NodeTest";

interface TestSelectorProps {
  onTestComplete: (
    testId: string,
    score: number,
    totalQuestions: number,
  ) => void;
}

const courses = [
  {
    id: 1,
    title: "JavaScript Advanced",
    description:
      "Углубленное изучение современного JavaScript, ES6+, асинхронность",
    level: "Продвинутый",
    questions: 7,
    icon: "Code2",
    component: "javascript",
  },
  {
    id: 2,
    title: "React & TypeScript",
    description: "Разработка современных веб-приложений с React и TypeScript",
    level: "Средний",
    questions: 6,
    icon: "Component",
    component: "react",
  },
  {
    id: 3,
    title: "Node.js Backend",
    description: "Серверная разработка на Node.js, Express, базы данных",
    level: "Средний",
    questions: 6,
    icon: "Server",
    component: "node",
  },
  {
    id: 4,
    title: "Python для аналитики",
    description: "Анализ данных с Python, pandas, numpy, машинное обучение",
    level: "Начальный",
    questions: 6,
    icon: "BarChart3",
    component: "python",
  },
  {
    id: 5,
    title: "DevOps практики",
    description: "Docker, Kubernetes, CI/CD, мониторинг и деплой приложений",
    level: "Продвинутый",
    questions: 6,
    icon: "Settings",
    component: "devops",
  },
  {
    id: 6,
    title: "Алгоритмы и структуры данных",
    description: "Основы алгоритмов, сложность, оптимизация кода",
    level: "Средний",
    questions: 6,
    icon: "Network",
    component: "algorithms",
  },
];

const TestSelector = ({ onTestComplete }: TestSelectorProps) => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

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

  const renderTest = () => {
    switch (selectedTest) {
      case "javascript":
        return (
          <JavaScriptTest
            onComplete={onTestComplete}
            onBack={() => setSelectedTest(null)}
          />
        );
      case "react":
        return (
          <ReactTest
            onComplete={onTestComplete}
            onBack={() => setSelectedTest(null)}
          />
        );
      case "node":
        return (
          <NodeTest
            onComplete={onTestComplete}
            onBack={() => setSelectedTest(null)}
          />
        );
      default:
        return null;
    }
  };

  if (selectedTest) {
    return (
      <section id="tests" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Тестирование знаний
            </h2>
            <p className="text-xl text-gray-600">
              Проверьте свои знания по выбранному курсу
            </p>
          </div>
          {renderTest()}
        </div>
      </section>
    );
  }

  return (
    <section id="tests" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Выберите тест
          </h2>
          <p className="text-xl text-gray-600">
            Пройдите тестирование по интересующему курсу
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
                <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                  <Icon name="FileText" size={16} className="mr-1" />
                  {course.questions} вопросов
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => setSelectedTest(course.component)}
                  disabled={
                    !["javascript", "react", "node"].includes(course.component)
                  }
                >
                  {["javascript", "react", "node"].includes(course.component)
                    ? "Начать тест"
                    : "Скоро доступен"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestSelector;
