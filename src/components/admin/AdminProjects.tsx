import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  images: string[];
}

interface AdminProjectsProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const AdminProjects = ({ projects, setProjects }: AdminProjectsProps) => {
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    image: '',
    description: '',
    category: '',
    images: []
  });
  const [showNewProject, setShowNewProject] = useState(false);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('admin-projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: number) => {
    if (confirm('Удалить проект?')) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
    }
  };

  const addImageToProject = (projectId: number, imageUrl: string) => {
    const updated = projects.map(p => 
      p.id === projectId 
        ? { ...p, images: [...(p.images || [p.image]), imageUrl] }
        : p
    );
    saveProjects(updated);
  };

  const removeImageFromProject = (projectId: number, imageIndex: number) => {
    const updated = projects.map(p => 
      p.id === projectId 
        ? { ...p, images: p.images.filter((_, i) => i !== imageIndex) }
        : p
    );
    saveProjects(updated);
  };

  const updateProject = (id: number, field: string, value: string) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    saveProjects(updated);
  };

  const createProject = () => {
    if (newProject.title && newProject.image && newProject.description && newProject.category) {
      const nextId = Math.max(...projects.map(p => p.id), 0) + 1;
      const projectToAdd: Project = {
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

  return (
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
                        if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                          addImageToProject(project.id, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
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
  );
};

export default AdminProjects;