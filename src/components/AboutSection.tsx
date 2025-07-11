const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
