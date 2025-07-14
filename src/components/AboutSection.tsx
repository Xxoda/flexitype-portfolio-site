import { useState, useEffect } from "react";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState({
    title: 'О нас',
    text1: 'Мы — Flexitype. Студия, которая превращает идеи в стиль.',
    text2: 'Логотипы, брендинг, интерфейсы, упаковка — всё, что говорит за вас.',
    text3: 'Мы не просто делаем дизайн. Мы делаем его живым.',
    image: '/img/eafb8d6c-79e3-4d11-bd54-296201c12e9c.jpg'
  });

  useEffect(() => {
    const savedData = localStorage.getItem('admin-about');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAboutData(parsedData);
      } catch (error) {
        console.error('Error parsing saved about data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem('admin-about');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setAboutData(parsedData);
        } catch (error) {
          console.error('Error parsing saved about data:', error);
        }
      }
    };

    // Слушатель кастомных событий для мгновенной синхронизации
    const handleCustomEvent = (e: CustomEvent) => {
      if (e.detail.key === 'admin-about') {
        setAboutData(e.detail.data);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('admin-data-changed', handleCustomEvent as EventListener);
    
    // Более частая проверка для лучшей синхронизации
    const checkForUpdates = setInterval(() => {
      handleStorageChange();
    }, 50);

    // Проверка при фокусе на окно
    const handleFocus = () => {
      handleStorageChange();
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-data-changed', handleCustomEvent as EventListener);
      window.removeEventListener('focus', handleFocus);
      clearInterval(checkForUpdates);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-flexitype-white"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl text-flexitype-blue mb-6 sm:mb-8">
              {aboutData.title}
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-flexitype-black/80 font-inter leading-relaxed">
              <p>{aboutData.text1}</p>
              <p>{aboutData.text2}</p>
              <p>{aboutData.text3}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={aboutData.image}
              alt="Flexitype Studio"
              className="w-full max-w-md rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;