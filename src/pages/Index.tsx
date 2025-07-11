import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Project {
  id: number;
  title: string;
  image: string;
  images: string[];
  description: string;
  category: string;
}

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Создаем данные для 24 проектов
  const projectImages = [
    "/img/26e75aa9-98fa-4c8c-a563-d6a2995a68a8.jpg",
    "/img/baf710f5-3716-425b-886c-31afe4d42582.jpg",
    "/img/ec0eed32-50b0-40bc-a07a-816058d5972d.jpg",
    "/img/1c151082-a3dc-4a76-97c5-3eca3f4c6bf2.jpg",
    "/img/ac9dd3ae-eb49-4885-aab0-955b60a9db86.jpg",
    "/img/d9d8567a-164c-4275-b176-f3d0dcab3ff4.jpg",
  ];

  const projects: Project[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Проект ${i + 1}`,
    image: projectImages[i % projectImages.length],
    images: projectImages,
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Сообщение отправлено!");
    setFormData({ name: "", email: "", message: "" });
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-flexitype-white text-flexitype-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-flexitype-white/95 backdrop-blur-sm z-50 border-b border-flexitype-blue/20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn.poehali.dev/files/fbc04803-d3cf-4124-a182-7cc156b9ca86.png"
                alt="Flexitype"
                className="w-8 h-8 object-contain"
              />
              <span className="font-satoshi font-bold text-xl text-flexitype-black">
                Flexitype
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                Проекты
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                Контакты
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name="Menu" size={24} className="text-flexitype-black" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-flexitype-blue/20 pt-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left py-2 text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left py-2 text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                Проекты
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="block w-full text-left py-2 text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                Контакты
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-flexitype-white to-flexitype-gray"
      >
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(45deg, #2576D9 25%, transparent 25%), 
              linear-gradient(-45deg, #2576D9 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #2576D9 75%), 
              linear-gradient(-45deg, transparent 75%, #2576D9 75%)
            `,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
            }}
          ></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-16 h-16 bg-flexitype-blue/10 transform rotate-45 animate-float"></div>
          <div
            className="absolute top-40 right-32 w-12 h-12 bg-flexitype-blue/10 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-8 h-16 bg-flexitype-blue/10 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-20 h-8 bg-flexitype-blue/10 animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="text-center z-10 px-4 sm:px-6">
          <h1 className="font-satoshi font-bold text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 tracking-wider">
            {"PORTFOLIO".split("").map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${
                  animatedLetters[index]
                    ? "text-flexitype-blue transform -translate-y-2 animate-glow"
                    : "text-flexitype-black"
                }`}
              >
                {letter}
              </span>
            ))}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-flexitype-black/70 mb-8 sm:mb-12 animate-fade-up font-inter">
            дизайн, который двигает
          </p>

          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-flexitype-blue hover:bg-flexitype-blue/80 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-satoshi font-medium transition-all duration-300 hover:scale-105"
          >
            Смотреть работы
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-flexitype-white"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl text-flexitype-blue mb-6 sm:mb-8">
                О нас
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-flexitype-black/80 font-inter leading-relaxed">
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
      <section
        id="projects"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-flexitype-gray relative"
      >
        <div className="container mx-auto">
          <h2 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl text-center text-flexitype-blue mb-8 sm:mb-12">
            Наши проекты
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-flexitype-white border-flexitype-blue/20 hover:border-flexitype-blue/50 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg hover:shadow-xl"
                onClick={() => openProject(project)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-satoshi font-semibold text-lg sm:text-xl text-flexitype-black mb-2">
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
      <section
        id="contacts"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-flexitype-white"
      >
        <div className="container mx-auto">
          <h2 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl text-center text-flexitype-blue mb-8 sm:mb-12">
            Контакты
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {/* Contact Form */}
            <div className="space-y-6">
              <h3 className="font-satoshi font-semibold text-xl sm:text-2xl text-flexitype-black mb-6">
                Напишите нам
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-flexitype-black">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-flexitype-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-flexitype-black">
                    Сообщение
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black min-h-32"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-flexitype-blue hover:bg-flexitype-blue/80 text-white"
                >
                  Отправить сообщение
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="font-satoshi font-semibold text-xl sm:text-2xl text-flexitype-black mb-6">
                Соцсети
              </h3>
              <div className="space-y-4">
                <a
                  href="https://t.me/flexitype"
                  className="flex items-center space-x-4 text-flexitype-black hover:text-flexitype-blue transition-colors group p-4 rounded-lg border border-flexitype-blue/20 hover:border-flexitype-blue/50 bg-flexitype-white hover:bg-flexitype-gray"
                >
                  <Icon
                    name="MessageCircle"
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-inter">Telegram</span>
                </a>

                <a
                  href="https://vk.com/flexitype"
                  className="flex items-center space-x-4 text-flexitype-black hover:text-flexitype-blue transition-colors group p-4 rounded-lg border border-flexitype-blue/20 hover:border-flexitype-blue/50 bg-flexitype-white hover:bg-flexitype-gray"
                >
                  <Icon
                    name="Users"
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-inter">VKontakte</span>
                </a>

                <a
                  href="https://wa.me/your-number"
                  className="flex items-center space-x-4 text-flexitype-black hover:text-flexitype-blue transition-colors group p-4 rounded-lg border border-flexitype-blue/20 hover:border-flexitype-blue/50 bg-flexitype-white hover:bg-flexitype-gray"
                >
                  <Icon
                    name="Phone"
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-inter">WhatsApp</span>
                </a>

                <a
                  href="mailto:info@flexitype.com"
                  className="flex items-center space-x-4 text-flexitype-black hover:text-flexitype-blue transition-colors group p-4 rounded-lg border border-flexitype-blue/20 hover:border-flexitype-blue/50 bg-flexitype-white hover:bg-flexitype-gray"
                >
                  <Icon
                    name="Mail"
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-inter">E-mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 bg-flexitype-gray border-t border-flexitype-blue/20">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-4 space-x-3">
            <img
              src="https://cdn.poehali.dev/files/fbc04803-d3cf-4124-a182-7cc156b9ca86.png"
              alt="Flexitype"
              className="w-6 h-6 object-contain"
            />
            <div className="font-satoshi font-bold text-lg text-flexitype-blue">
              Flexitype
            </div>
          </div>
          <p className="text-flexitype-black/60 font-inter">
            © Flexitype, 2025
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-satoshi text-2xl text-flexitype-blue">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Main Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedProject?.images[currentImageIndex]}
                  alt={selectedProject?.title}
                  className="w-full rounded-lg aspect-square object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-flexitype-white/90 text-flexitype-blue p-2 rounded-full hover:bg-flexitype-blue/20 transition-colors shadow-lg"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-flexitype-white/90 text-flexitype-blue p-2 rounded-full hover:bg-flexitype-blue/20 transition-colors shadow-lg"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto">
                {selectedProject?.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      currentImageIndex === index
                        ? "border-flexitype-blue"
                        : "border-flexitype-blue/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${selectedProject?.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <span className="text-flexitype-blue font-inter font-medium text-sm">
                  {selectedProject?.category}
                </span>
                <h3 className="font-satoshi text-xl text-flexitype-black mt-2">
                  {selectedProject?.title}
                </h3>
              </div>

              <p className="text-flexitype-black/80 font-inter leading-relaxed">
                {selectedProject?.description}
              </p>

              <div className="space-y-4">
                <h4 className="font-satoshi font-semibold text-flexitype-blue">
                  Детали проекта:
                </h4>
                <ul className="space-y-2 text-flexitype-black/70 font-inter">
                  <li>• Современный подход к дизайну</li>
                  <li>• Адаптивная верстка</li>
                  <li>• Пользовательский интерфейс</li>
                  <li>• Брендинг и айдентика</li>
                </ul>
              </div>

              <Button
                onClick={() => setSelectedProject(null)}
                variant="outline"
                className="w-full border-flexitype-blue/30 text-flexitype-blue hover:bg-flexitype-blue/10"
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
