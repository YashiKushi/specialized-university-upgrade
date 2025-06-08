import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Повышение квалификации для
            <span className="text-purple-600"> программистов</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Профессиональные курсы и тестирование для развития ваших навыков в
            программировании. Получите сертификат и повысьте свою квалификацию.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 px-8"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Начать обучение
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Icon name="FileText" size={20} className="mr-2" />
              Пройти тест
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Code" size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Практические задачи
              </h3>
              <p className="text-gray-600">
                Решайте реальные задачи из разработки
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Сертификация</h3>
              <p className="text-gray-600">Получите официальные сертификаты</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Отслеживание прогресса
              </h3>
              <p className="text-gray-600">Следите за своими достижениями</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
