import { useState } from 'react';

interface Link {
  name: string;
  url: string;
  icon: string;
}

interface ContactsData {
  title: string;
  formTitle: string;
  socialTitle: string;
  email: string;
  links: Link[];
}

interface AdminContactsProps {
  contactsData: ContactsData;
  setContactsData: (data: ContactsData) => void;
}

const AdminContacts = ({ contactsData, setContactsData }: AdminContactsProps) => {
  const [newLink, setNewLink] = useState({ name: '', url: '', icon: 'Link' });

  const saveContacts = () => {
    localStorage.setItem('admin-contacts', JSON.stringify(contactsData));
    
    // Принудительно вызываем событие для синхронизации
    window.dispatchEvent(new CustomEvent('admin-data-changed', {
      detail: { key: 'admin-contacts', data: contactsData, timestamp: Date.now() }
    }));
    
    // Эмулируем событие storage
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'admin-contacts',
      newValue: JSON.stringify(contactsData),
      oldValue: localStorage.getItem('admin-contacts')
    }));
    
    alert('Контакты сохранены!');
  };

  const removeLink = (index: number) => {
    setContactsData({
      ...contactsData,
      links: contactsData.links.filter((_, i) => i !== index)
    });
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

  return (
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
  );
};

export default AdminContacts;