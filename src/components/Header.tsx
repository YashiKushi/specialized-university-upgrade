import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">СПЕЦВУЗ</h1>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a
            href="#courses"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Курсы
          </a>
          <a
            href="#tests"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Тестирование
          </a>
          <a
            href="#progress"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Прогресс
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            Войти
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            Регистрация
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
