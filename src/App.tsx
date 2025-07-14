
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "flexitype2025") {
      setIsAuthenticated(true);
    } else {
      alert("Неверный пароль");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Вход в админ-панель</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Пароль админа"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button 
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminInterface />;
};

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

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const saveAbout = () => {
    saveToStorage('admin-about', aboutData);
    alert('Данные о компании сохранены!');
  };

  const saveContacts = () => {
    saveToStorage('admin-contacts', contactsData);
    alert('Контакты сохранены!');
  };

  const removeLink = (index) => {
    setContactsData({
      ...contactsData,
      links: contactsData.links.filter((_, i) => i !== index)
    });
  };

  const [projects, setProjects] = useState(() => {
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

  const [editingProject, setEditingProject] = useState(null);
  const [newLink, setNewLink] = useState({ name: '', url: '', icon: 'Link' });
  const [newProject, setNewProject] = useState({
    title: '',
    image: '',
    description: '',
    category: '',
    images: []
  });
  const [showNewProject, setShowNewProject] = useState(false);

  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    saveToStorage('admin-projects', updatedProjects);
  };

  const deleteProject = (id) => {
    if (confirm('Удалить проект?')) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
    }
  };

  const addImageToProject = (projectId, imageUrl) => {
    const updated = projects.map(p => 
      p.id === projectId 
        ? { ...p, images: [...(p.images || [p.image]), imageUrl] }
        : p
    );
    saveProjects(updated);
  };

  const removeImageFromProject = (projectId, imageIndex) => {
    const updated = projects.map(p => 
      p.id === projectId 
        ? { ...p, images: p.images.filter((_, i) => i !== imageIndex) }
        : p
    );
    saveProjects(updated);
  };

  const updateProject = (id, field, value) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    saveProjects(updated);
  };

  const addLink = () => {
    if (newLink.name && newLink.url) {
      setContactsData({
        ...contactsData,
        links: [...contactsData.links, { ...newLink }]
      });
      setNewLink({ name: '', url: '', icon: 'Link' });
    }
  };

  const createProject = () => {
    if (newProject.title && newProject.image && newProject.description && newProject.category) {
      const nextId = Math.max(...projects.map(p => p.id), 0) + 1;
      const projectToAdd = {
        ...newProject,
        id: nextId,
        images: newProject.image ? [newProject.image] : []
      };
      
      const updated = [...projects, projectToAdd];
      saveProjects(updated);
      
      setNewProject({ title: '', image: '', description: '', category: '', images: [] });
      setShowNewProject(false);
      alert('Проект создан!');
    } else {
      alert('Заполните все поля!');
    }
  };

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
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Редактирование секции "О нас"</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок</label>
                <input
                  type="text"
                  value={aboutData.title}
                  onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Первый абзац</label>
                <textarea
                  value={aboutData.text1}
                  onChange={(e) => setAboutData({...aboutData, text1: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Второй абзац</label>
                <textarea
                  value={aboutData.text2}
                  onChange={(e) => setAboutData({...aboutData, text2: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Третий абзац</label>
                <textarea
                  value={aboutData.text3}
                  onChange={(e) => setAboutData({...aboutData, text3: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ссылка на изображение</label>
                <input
                  type="url"
                  value={aboutData.image}
                  onChange={(e) => setAboutData({...aboutData, image: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                {aboutData.image && (
                  <img src={aboutData.image} alt="Превью" className="mt-2 w-32 h-32 object-cover rounded" />
                )}
              </div>
              <button onClick={saveAbout} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Сохранить изменения
              </button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Управление проектами</h2>
                <button
                  onClick={() => setShowNewProject(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  + Добавить проект
                </button>
              </div>

              {showNewProject && (
                <div className="mb-6 p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
                  <h3 className="font-bold mb-4">Создание нового проекта</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Название проекта"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Категория"
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="p-2 border rounded"
                    />
                    <input
                      type="url"
                      placeholder="Ссылка на обложку"
                      value={newProject.image}
                      onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                      className="p-2 border rounded md:col-span-2"
                    />
                    <textarea
                      placeholder="Описание проекта"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="p-2 border rounded md:col-span-2 h-20"
                    />
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={createProject}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Создать
                    </button>
                    <button
                      onClick={() => setShowNewProject(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="aspect-square mb-3 overflow-hidden rounded">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    
                    {editingProject === project.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          placeholder="Название"
                        />
                        <input
                          type="url"
                          value={project.image}
                          onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          placeholder="Обложка"
                        />
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          className="w-full p-2 border rounded text-sm h-20"
                          placeholder="Описание"
                        />
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          placeholder="Категория"
                        />
                        
                        <div>
                          <label className="text-xs text-gray-600">Галерея изображений:</label>
                          {(project.images || []).map((img, i) => (
                            <div key={i} className="flex items-center space-x-2 mt-1">
                              <img src={img} alt="" className="w-8 h-8 object-cover rounded" />
                              <button 
                                onClick={() => removeImageFromProject(project.id, i)}
                                className="text-red-600 text-xs hover:text-red-800"
                              >
                                Удалить
                              </button>
                            </div>
                          ))}
                          <input
                            type="url"
                            placeholder="Ссылка на новое изображение"
                            className="w-full p-2 border rounded text-xs mt-2"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.target.value) {
                                addImageToProject(project.id, e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProject(null)}
                            className="flex-1 bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700"
                          >
                            Готово
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-sm mb-2">{project.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                        <p className="text-xs text-gray-500 mb-3">{project.category}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProject(project.id)}
                            className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Редактирование контактов</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок секции</label>
                <input
                  type="text"
                  value={contactsData.title}
                  onChange={(e) => setContactsData({...contactsData, title: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок формы</label>
                <input
                  type="text"
                  value={contactsData.formTitle}
                  onChange={(e) => setContactsData({...contactsData, formTitle: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email для контактов</label>
                <input
                  type="email"
                  value={contactsData.email}
                  onChange={(e) => setContactsData({...contactsData, email: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  placeholder="info@flexitype.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок соцсетей</label>
                <input
                  type="text"
                  value={contactsData.socialTitle}
                  onChange={(e) => setContactsData({...contactsData, socialTitle: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Ссылки на соцсети</label>
                
                {contactsData.links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-3 p-3 border rounded-lg">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => {
                        const updated = [...contactsData.links];
                        updated[index].name = e.target.value;
                        setContactsData({...contactsData, links: updated});
                      }}
                      className="flex-1 p-2 border rounded"
                      placeholder="Название"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...contactsData.links];
                        updated[index].url = e.target.value;
                        setContactsData({...contactsData, links: updated});
                      }}
                      className="flex-1 p-2 border rounded"
                      placeholder="Ссылка"
                    />
                    <input
                      type="text"
                      value={link.icon}
                      onChange={(e) => {
                        const updated = [...contactsData.links];
                        updated[index].icon = e.target.value;
                        setContactsData({...contactsData, links: updated});
                      }}
                      className="w-32 p-2 border rounded"
                      placeholder="Иконка"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
                
                <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
                  <input
                    type="text"
                    value={newLink.name}
                    onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                    className="flex-1 p-2 border rounded"
                    placeholder="Новая ссылка - название"
                  />
                  <input
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    className="flex-1 p-2 border rounded"
                    placeholder="URL"
                  />
                  <input
                    type="text"
                    value={newLink.icon}
                    onChange={(e) => setNewLink({...newLink, icon: e.target.value})}
                    className="w-32 p-2 border rounded"
                    placeholder="Иконка"
                  />
                  <button
                    onClick={addLink}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <button onClick={saveContacts} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Сохранить изменения
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SecretAccess = ({ children }: { children: React.ReactNode }) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const secretSequence = ['a', 'd', 'm', 'i', 'n'];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = [...keySequence, event.key.toLowerCase()].slice(-5);
      setKeySequence(newSequence);
      
      if (newSequence.join('') === secretSequence.join('')) {
        setShowAdmin(true);
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  if (showAdmin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Скрытый доступ</h2>
            <button 
              onClick={() => setShowAdmin(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          <button 
            onClick={() => window.location.href = '/admin'}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Открыть админ панель
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SecretAccess>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SecretAccess>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;