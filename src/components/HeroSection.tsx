import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([]);

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

  return (
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
  );
};

export default HeroSection;
