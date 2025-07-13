import { useState } from "react";
import { PROJECT_DATA } from "@/hooks/useProjects";

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
    links: [
      { name: 'Telegram', url: 'https://t.me/flexitype', icon: 'MessageCircle' },
      { name: 'VKontakte', url: 'https://vk.com/flexitype', icon: 'Users' },
      { name: 'WhatsApp', url: 'https://wa.me/your-number', icon: 'Phone' },
      { name: 'E-mail', url: 'mailto:info@flexitype.com', icon: 'Mail' }
    ]
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('admin-projects');
    return saved ? JSON.parse(saved) : PROJECT_DATA.map(p => ({
      ...p,
      images: [p.image],
      subtitle: ""
    }));
  });

  const [editingProject, setEditingProject] = useState(null);
  const [newLink, setNewLink] = useState({ name: '', url: '', icon: 'Link' });

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

  const removeLink = (index) => {
    setContactsData({
      ...contactsData,
      links: contactsData.links.filter((_, i) => i !== index)
    });
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
              <h2 className="text-xl font-bold mb-6">Управление проектами</h2>
              
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

export default AdminInterface;