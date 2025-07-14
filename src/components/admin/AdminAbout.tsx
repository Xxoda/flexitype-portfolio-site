import { useState } from 'react';

interface AboutData {
  title: string;
  text1: string;
  text2: string;
  text3: string;
  image: string;
}

interface AdminAboutProps {
  aboutData: AboutData;
  setAboutData: (data: AboutData) => void;
}

const AdminAbout = ({ aboutData, setAboutData }: AdminAboutProps) => {
  const saveAbout = () => {
    localStorage.setItem('admin-about', JSON.stringify(aboutData));
    alert('Данные о компании сохранены!');
  };

  return (
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
  );
};

export default AdminAbout;