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
  {
    id: 1,
    question: "Что такое Node.js?",
    options: [
      "JavaScript runtime для серверной разработки",
      "Фреймворк для фронтенда",
      "База данных",
      "CSS препроцессор",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "Какая команда устанавливает пакеты из package.json?",
    options: ["npm start", "npm install", "npm run", "npm init"],
    correct: 1,
  },
  {
    id: 3,
    question: "Что такое Express.js?",
    options: [
      "Веб-фреймворк для Node.js",
      "База данных",
      "Frontend библиотека",
      "Тестовый фреймворк",
    ],
    correct: 0,
  },
  {
    id: 4,
    question: "Как создать HTTP сервер в Node.js?",
    options: [
      "http.createServer()",
      "server.create()",
      "new Server()",
      "createHTTP()",
    ],
    correct: 0,
  },
  {
    id: 5,
    question: "Что такое middleware в Express?",
    options: [
      "Функция, которая выполняется между запросом и ответом",
      "База данных",
      "Роутер",
      "Шаблонизатор",
    ],
    correct: 0,
  },
  {
    id: 6,
    question: "Какой метод используется для чтения файла асинхронно?",
    options: ["fs.readFile()", "fs.readFileSync()", "fs.read()", "file.read()"],
    correct: 0,
  },
];

interface NodeTestProps {
  onComplete: (testId: string, score: number, totalQuestions: number) => void;
  onBack: () => void;
}

const NodeTest = ({ onComplete, onBack }: NodeTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Подсчитываем результат
      const finalScore = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === testQuestions[index].correct ? 1 : 0);
      }, 0);
      setScore(finalScore);
      setShowResult(true);
      onComplete("node", finalScore, testQuestions.length);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <CardTitle className="text-2xl">Тест завершен!</CardTitle>
          <CardDescription>
            Вы ответили правильно на {score} из {testQuestions.length} вопросов
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-purple-600">
            {Math.round((score / testQuestions.length) * 100)}%
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetTest} variant="outline">
              Пройти снова
            </Button>
            <Button onClick={onBack}>Вернуться к выбору тестов</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <Icon name="ChevronLeft" size={16} className="mr-1" />
          Назад к курсам
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg">
              Вопрос {currentQuestion + 1} из {testQuestions.length}
            </CardTitle>
            <div className="text-sm text-gray-500">Node.js Backend</div>
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
              onValueChange={handleAnswerSelect}
            >
              {testQuestions[currentQuestion].options.map((option, index) => (
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
              ))}
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
  );
};

export default NodeTest;
