import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
}

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([]);

  // Создаем данные для 24 проектов
  const projects: Project[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Проект ${i + 1}`,
    image: "/img/26e75aa9-98fa-4c8c-a563-d6a2995a68a8.jpg",
    description: `Описание проекта ${i + 1}. Креативное решение в области дизайна, которое воплощает современные тенденции и инновационный подход.`,
    category: ["Логотип", "Брендинг", "Интерфейс", "Упаковка"][i % 4],
  }));

  // Анимация букв для PORTFOLIO
  useEffect(() => {
    const letters = "PORTFOLIO".split("");
    const intervals: NodeJS.Timeout[] = [];

    letters.forEach((_, index) => {
      const interval = setInterval(
        () => {
          setAnimatedLetters((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
          });
        },
        1000 + index * 200,
      );
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-flexitype-black text-flexitype-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-flexitype-black/90 backdrop-blur-sm z-50 border-b border-flexitype-blue/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-satoshi font-bold text-xl text-flexitype-blue">
              FLEXITYPE
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-flexitype-light hover:text-flexitype-blue transition-colors"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-flexitype-light hover:text-flexitype-blue transition-colors"
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-flexitype-light hover:text-flexitype-blue transition-colors"
              >
                Проекты
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-flexitype-light hover:text-flexitype-blue transition-colors"
              >
                Контакты
              </button>
            </div>
            <div className="md:hidden">
              <Icon name="Menu" size={24} className="text-flexitype-light" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-flexitype-blue/20 to-flexitype-cyan/20"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(37, 118, 217, 0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
              animation: "float 6s ease-in-out infinite",
            }}
          ></div>
        </div>

        <div className="text-center z-10 px-6">
          <h1 className="font-satoshi font-bold text-6xl md:text-8xl lg:text-9xl mb-8 tracking-wider">
            {"PORTFOLIO".split("").map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${
                  animatedLetters[index]
                    ? "text-flexitype-blue transform -translate-y-2 animate-glow"
                    : "text-flexitype-light"
                }`}
              >
                {letter}
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-flexitype-light/80 mb-12 animate-fade-up font-inter">
            дизайн, который двигает
          </p>

          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-flexitype-blue hover:bg-flexitype-blue/80 text-white px-8 py-4 text-lg font-satoshi font-medium transition-all duration-300 hover:scale-105"
          >
            Смотреть работы
          </Button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-flexitype-blue rounded-full animate-float opacity-60"></div>
        <div
          className="absolute bottom-32 right-32 w-6 h-6 bg-flexitype-cyan rounded-full animate-float opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-2 h-2 bg-flexitype-blue rounded-full animate-float opacity-80"
          style={{ animationDelay: "2s" }}
        ></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-satoshi font-bold text-4xl md:text-5xl text-flexitype-blue mb-8">
                О нас
              </h2>
              <div className="space-y-4 text-lg text-flexitype-light/90 font-inter leading-relaxed">
                <p>Мы — Flexitype. Студия, которая превращает идеи в стиль.</p>
                <p>
                  Логотипы, брендинг, интерфейсы, упаковка — всё, что говорит за
                  вас.
                </p>
                <p>Мы не просто делаем дизайн. Мы делаем его живым.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="/img/9c7791a1-793b-4d49-8479-dc747bc33273.jpg"
                alt="Flexitype Studio"
                className="w-full max-w-md rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-flexitype-black/50">
        <div className="container mx-auto">
          <h2 className="font-satoshi font-bold text-4xl md:text-5xl text-center text-flexitype-blue mb-12">
            Наши проекты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-flexitype-purple/20 border-flexitype-blue/20 hover:border-flexitype-blue/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-satoshi font-semibold text-xl text-flexitype-light mb-2">
                      {project.title}
                    </h3>
                    <p className="text-flexitype-blue font-inter text-sm">
                      {project.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="font-satoshi font-bold text-4xl md:text-5xl text-flexitype-blue mb-12">
            Контакты
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <a
              href="https://t.me/flexitype"
              className="flex flex-col items-center space-y-3 text-flexitype-light hover:text-flexitype-blue transition-colors group"
            >
              <Icon
                name="MessageCircle"
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-inter">Telegram</span>
            </a>

            <a
              href="https://vk.com/flexitype"
              className="flex flex-col items-center space-y-3 text-flexitype-light hover:text-flexitype-blue transition-colors group"
            >
              <Icon
                name="Users"
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-inter">VKontakte</span>
            </a>

            <a
              href="https://wa.me/your-number"
              className="flex flex-col items-center space-y-3 text-flexitype-light hover:text-flexitype-blue transition-colors group"
            >
              <Icon
                name="Phone"
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-inter">WhatsApp</span>
            </a>

            <a
              href="mailto:info@flexitype.com"
              className="flex flex-col items-center space-y-3 text-flexitype-light hover:text-flexitype-blue transition-colors group"
            >
              <Icon
                name="Mail"
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-inter">E-mail</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-flexitype-black border-t border-flexitype-blue/20">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="font-satoshi font-bold text-lg text-flexitype-blue">
              FLEXITYPE
            </div>
          </div>
          <p className="text-flexitype-light/60 font-inter">
            © Flexitype, 2025
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="bg-flexitype-black border-flexitype-blue/30 text-flexitype-light max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-satoshi text-2xl text-flexitype-blue">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedProject?.image}
              alt={selectedProject?.title}
              className="w-full rounded-lg"
            />
            <p className="text-flexitype-light/90 font-inter leading-relaxed">
              {selectedProject?.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-flexitype-blue font-inter font-medium">
                {selectedProject?.category}
              </span>
              <Button
                onClick={() => setSelectedProject(null)}
                variant="outline"
                className="border-flexitype-blue/30 text-flexitype-blue hover:bg-flexitype-blue/10"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
