import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PROJECT_DATA } from "@/hooks/useProjects";
import { Project } from "@/types";
import Icon from '@/components/ui/icon';

interface AdminProject extends Project {
  isEditing?: boolean;
}

const Admin = () => {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [newProject, setNewProject] = useState({
    title: "",
    image: "",
    description: "",
    category: ""
  });
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    setProjects(PROJECT_DATA.map(p => ({ ...p, images: [p.image], subtitle: "" })));
  }, []);

  const handleEdit = (id: number) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, isEditing: true } : { ...p, isEditing: false }
    ));
  };

  const handleSave = (id: number) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, isEditing: false } : p
    ));
    // Здесь можно добавить логику сохранения в localStorage или API
  };

  const handleCancel = (id: number) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, isEditing: false } : p
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm("Удалить проект?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleProjectChange = (id: number, field: string, value: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.image) return;
    
    const id = Math.max(...projects.map(p => p.id)) + 1;
    const project: AdminProject = {
      id,
      ...newProject,
      images: [newProject.image],
      subtitle: ""
    };
    
    setProjects([...projects, project]);
    setNewProject({ title: "", image: "", description: "", category: "" });
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Админ-панель</h1>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить проект
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый проект</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Ссылка на изображение</Label>
                  <Input
                    id="image"
                    value={newProject.image}
                    onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    value={newProject.category}
                    onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddProject} className="w-full">
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">#{project.id}</CardTitle>
                  <div className="flex gap-2">
                    {project.isEditing ? (
                      <>
                        <Button size="sm" onClick={() => handleSave(project.id)}>
                          <Icon name="Check" size={16} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCancel(project.id)}>
                          <Icon name="X" size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(project.id)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {project.isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label>Название</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Изображение</Label>
                      <Input
                        value={project.image}
                        onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Описание</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Input
                        value={project.category}
                        onChange={(e) => handleProjectChange(project.id, 'category', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                    <p className="text-xs text-gray-500">{project.category}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;