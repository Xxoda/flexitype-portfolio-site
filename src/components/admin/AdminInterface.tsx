import { useState } from 'react';
import AdminAbout from './AdminAbout';
import AdminProjects from './AdminProjects';
import AdminContacts from './AdminContacts';

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  images: string[];
}

const AdminInterface = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [aboutData, setAboutData] = useState({
    title: 'О нас',
    text1: 'Мы — Flexitype. Студия, которая превращает идеи в стиль.',
    text2: 'Логотипы, брендинг, интерфейсы, упаковка — всё, что говорит за вас.',
    text3: 'Мы не просто делаем дизайн. Мы делаем его живым.',
    image: '/img/eafb8d6c-79e3-4d11-bd54-296201c12e9c.jpg'
  });
  
  const [contactsData, setContactsData] = useState({
    title: 'Контакты',
    formTitle: 'Напишите нам',
    socialTitle: 'Соцсети',
    email: 'info@flexitype.com',
    links: [
      { name: 'Telegram', url: 'https://t.me/flexitype', icon: 'MessageCircle' },
      { name: 'VKontakte', url: 'https://vk.com/flexitype', icon: 'Users' },
      { name: 'WhatsApp', url: 'https://wa.me/your-number', icon: 'Phone' },
      { name: 'E-mail', url: 'mailto:info@flexitype.com', icon: 'Mail' }
    ]
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('admin-projects');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return [
      { id: 1, title: "Инфографика для маркетплейсов", image: "https://ltdfoto.ru/images/2025/07/13/image-412.png", description: "Создание привлекательной инфографики для товаров на маркетплейсах", category: "Графический дизайн", images: ["https://ltdfoto.ru/images/2025/07/13/image-412.png"] },
      { id: 2, title: "Билборды / Витрины / Стенды", image: "https://ltdfoto.ru/images/2025/07/13/image-413.png", description: "Дизайн наружной рекламы: билборды, витрины и рекламные стенды", category: "Наружная реклама", images: ["https://ltdfoto.ru/images/2025/07/13/image-413.png"] },
      { id: 3, title: "HTML-письма", image: "https://ltdfoto.ru/images/2025/07/13/image-414.png", description: "Создание адаптивных HTML-шаблонов для email-рассылок", category: "Email-маркетинг", images: ["https://ltdfoto.ru/images/2025/07/13/image-414.png"] },
      { id: 4, title: "Фирменный стиль", image: "/img/project-4.jpg", description: "Разработка логотипа и корпоративного стиля для компаний", category: "Брендинг", images: ["/img/project-4.jpg"] },
      { id: 5, title: "Веб-дизайн", image: "/img/project-5.jpg", description: "Создание современных адаптивных веб-сайтов", category: "Веб-дизайн", images: ["/img/project-5.jpg"] },
      { id: 6, title: "Упаковка товаров", image: "/img/project-6.jpg", description: "Дизайн упаковки продукции различных категорий", category: "Упаковка", images: ["/img/project-6.jpg"] },
      { id: 7, title: "Мобильные приложения", image: "/img/project-7.jpg", description: "UI/UX дизайн для мобильных приложений", category: "Мобильный дизайн", images: ["/img/project-7.jpg"] },
      { id: 8, title: "Полиграфия", image: "/img/project-8.jpg", description: "Дизайн буклетов, каталогов и печатной продукции", category: "Полиграфия", images: ["/img/project-8.jpg"] },
      { id: 9, title: "Социальные сети", image: "/img/project-9.jpg", description: "Оформление страниц в соцсетях, создание постов", category: "SMM", images: ["/img/project-9.jpg"] },
      { id: 10, title: "Презентации", image: "/img/project-10.jpg", description: "Создание эффектных бизнес-презентаций", category: "Презентации", images: ["/img/project-10.jpg"] },
      { id: 11, title: "Видеомонтаж", image: "/img/project-11.jpg", description: "Монтаж и обработка видеоматериалов", category: "Видеопродакшен", images: ["/img/project-11.jpg"] },
      { id: 12, title: "Анимация", image: "/img/project-12.jpg", description: "Создание анимированных элементов и роликов", category: "Анимация", images: ["/img/project-12.jpg"] },
      { id: 13, title: "Интерьерная графика", image: "/img/project-13.jpg", description: "Оформление интерьеров графическими элементами", category: "Интерьерный дизайн", images: ["/img/project-13.jpg"] },
      { id: 14, title: "Иллюстрации", image: "/img/project-14.jpg", description: "Создание уникальных иллюстраций для различных целей", category: "Иллюстрация", images: ["/img/project-14.jpg"] },
      { id: 15, title: "Стикеры и эмодзи", image: "/img/project-15.jpg", description: "Разработка стикерпаков для мессенджеров", category: "Стикеры", images: ["/img/project-15.jpg"] },
      { id: 16, title: "Реклама в транспорте", image: "/img/project-16.jpg", description: "Дизайн рекламы для общественного транспорта", category: "Транспортная реклама", images: ["/img/project-16.jpg"] },
      { id: 17, title: "Сувенирная продукция", image: "/img/project-17.jpg", description: "Дизайн корпоративных сувениров и подарков", category: "Сувениры", images: ["/img/project-17.jpg"] },
      { id: 18, title: "Текстильный дизайн", image: "/img/project-18.jpg", description: "Принты для одежды и текстильных изделий", category: "Текстиль", images: ["/img/project-18.jpg"] },
      { id: 19, title: "Игровая графика", image: "/img/project-19.jpg", description: "Создание графики для компьютерных игр", category: "Геймдев", images: ["/img/project-19.jpg"] },
      { id: 20, title: "AR/VR дизайн", image: "/img/project-20.jpg", description: "Дизайн для виртуальной и дополненной реальности", category: "AR/VR", images: ["/img/project-20.jpg"] }
    ];
  });

  const tabs = [
    { id: 'about', label: 'О нас' },
    { id: 'projects', label: 'Проекты' },
    { id: 'contacts', label: 'Контакты' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Админ-панель Flexitype</h1>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              На сайт
            </button>
          </div>
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium rounded-t-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {activeTab === 'about' && (
          <AdminAbout
            aboutData={aboutData}
            setAboutData={setAboutData}
          />
        )}

        {activeTab === 'projects' && (
          <AdminProjects
            projects={projects}
            setProjects={setProjects}
          />
        )}

        {activeTab === 'contacts' && (
          <AdminContacts
            contactsData={contactsData}
            setContactsData={setContactsData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminInterface;