import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const testQuestions = [
  // JavaScript
  {
    id: 1,
    question:
      "Что выведет следующий код JavaScript?\n```\nconsole.log(typeof null);\n```",
    options: ["null", "undefined", "object", "error"],
    correct: 2,
    category: "JavaScript",
  },
  {
    id: 2,
    question:
      "Какой из следующих методов используется для добавления элемента в конец массива?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0,
    category: "JavaScript",
  },
  {
    id: 3,
    question: "Что такое замыкание (closure) в JavaScript?",
    options: [
      "Функция внутри функции",
      "Функция, которая имеет доступ к переменным внешней области видимости",
      "Метод объекта",
      "Способ создания классов",
    ],
    correct: 1,
    category: "JavaScript",
  },
  {
    id: 4,
    question: "Что такое hoisting в JavaScript?",
    options: [
      "Перемещение объявлений переменных и функций в начало области видимости",
      "Создание копии объекта",
      "Удаление элементов из массива",
      "Сортировка массива",
    ],
    correct: 0,
    category: "JavaScript",
  },
  // Python
  {
    id: 5,
    question: "Что выведет этот код Python?\n```\nprint([1, 2, 3] * 2)\n```",
    options: ["[1, 2, 3, 1, 2, 3]", "[2, 4, 6]", "error", "[1, 2, 3]"],
    correct: 0,
    category: "Python",
  },
  {
    id: 6,
    question: "Какой тип данных НЕ является изменяемым в Python?",
    options: ["list", "dict", "set", "tuple"],
    correct: 3,
    category: "Python",
  },
  {
    id: 7,
    question: "Что делает метод range(1, 10, 2) в Python?",
    options: [
      "Создает список [1, 3, 5, 7, 9]",
      "Создает список [1, 2, 3, 4, 5, 6, 7, 8, 9]",
      "Создает список [2, 4, 6, 8, 10]",
      "Выдает ошибку",
    ],
    correct: 0,
    category: "Python",
  },
  // React
  {
    id: 8,
    question: "Для чего используется useEffect в React?",
    options: [
      "Для управления состоянием компонента",
      "Для выполнения побочных эффектов",
      "Для создания контекста",
      "Для оптимизации рендеринга",
    ],
    correct: 1,
    category: "React",
  },
  {
    id: 9,
    question: "Что такое JSX в React?",
    options: [
      "JavaScript XML - синтаксическое расширение для JavaScript",
      "Новый язык программирования",
      "Библиотека для работы с DOM",
      "Фреймворк для CSS",
    ],
    correct: 0,
    category: "React",
  },
  {
    id: 10,
    question:
      "Какой хук используется для управления состоянием в функциональных компонентах?",
    options: ["useEffect", "useState", "useContext", "useCallback"],
    correct: 1,
    category: "React",
  },
  // Алгоритмы
  {
    id: 11,
    question: "Какова временная сложность бинарного поиска?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    category: "Алгоритмы",
  },
  {
    id: 12,
    question: "Что такое рекурсия в программировании?",
    options: [
      "Функция, которая вызывает саму себя",
      "Цикл for",
      "Условная конструкция",
      "Способ объявления переменных",
    ],
    correct: 0,
    category: "Алгоритмы",
  },
  // Структуры данных
  {
    id: 13,
    question:
      "Какая структура данных работает по принципу LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Array", "Tree"],
    correct: 1,
    category: "Структуры данных",
  },
  {
    id: 14,
    question: "В чем основное преимущество хеш-таблицы?",
    options: [
      "Быстрый поиск O(1) в среднем случае",
      "Сортированное хранение данных",
      "Минимальное использование памяти",
      "Простота реализации",
    ],
    correct: 0,
    category: "Структуры данных",
  },
  // Дополнительные вопросы
  {
    id: 15,
    question: "Что означает аббревиатура API?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Integration",
      "Automated Program Instruction",
      "Application Process Interface",
    ],
    correct: 0,
    category: "Общие знания",
  },
];

const TestSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, parseInt(selectedAnswer)];
      setAnswers(newAnswers);

      if (currentQuestion < testQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === testQuestions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / testQuestions.length) * 100);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <section id="tests" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Тест завершен!</CardTitle>
                <CardDescription>Ваш результат по JavaScript</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-4xl font-bold text-purple-600 mb-4">
                  {score}%
                </div>
                <p className="text-gray-600 mb-6">
                  Правильных ответов:{" "}
                  {
                    answers.filter(
                      (answer, index) =>
                        answer === testQuestions[index].correct,
                    ).length
                  }{" "}
                  из {testQuestions.length}
                </p>

                <div className="flex gap-4 justify-center">
                  <Button onClick={resetTest} variant="outline">
                    Пройти снова
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Следующий тест
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tests" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Тестирование знаний
          </h2>
          <p className="text-xl text-gray-600">
            Проверьте свои знания JavaScript
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-lg">
                  Вопрос {currentQuestion + 1} из {testQuestions.length}
                </CardTitle>
                <div className="text-sm text-gray-500">
                  {testQuestions[currentQuestion].category}
                </div>
              </div>
              <Progress
                value={((currentQuestion + 1) / testQuestions.length) * 100}
                className="h-2"
              />
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 whitespace-pre-wrap">
                  {testQuestions[currentQuestion].question}
                </h3>

                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                >
                  {testQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0}
                  onClick={() =>
                    setCurrentQuestion(Math.max(0, currentQuestion - 1))
                  }
                >
                  <Icon name="ChevronLeft" size={16} className="mr-1" />
                  Назад
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {currentQuestion === testQuestions.length - 1
                    ? "Завершить"
                    : "Далее"}
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestSection;
