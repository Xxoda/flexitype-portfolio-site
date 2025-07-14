import { useMemo, useState, useEffect } from "react";
import { Project } from "@/types";

const DEFAULT_PROJECT_DATA: Project[] = [];

export const useProjects = (): Project[] => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('admin-projects');
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        const formattedProjects = parsedProjects.map((item: any) => ({
          ...item,
          images: item.images || [item.image],
          subtitle: ""
        }));
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error parsing saved projects:', error);
        setProjects(DEFAULT_PROJECT_DATA);
      }
    } else {
      setProjects(DEFAULT_PROJECT_DATA);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedProjects = localStorage.getItem('admin-projects');
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects);
          const formattedProjects = parsedProjects.map((item: any) => ({
            ...item,
            images: item.images || [item.image],
            subtitle: ""
          }));
          setProjects(formattedProjects);
        } catch (error) {
          console.error('Error parsing saved projects:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('admin-data-changed', handleStorageChange);
    
    const checkForUpdates = setInterval(() => {
      handleStorageChange();
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-data-changed', handleStorageChange);
      clearInterval(checkForUpdates);
    };
  }, []);

  return projects;
};

export { DEFAULT_PROJECT_DATA as PROJECT_DATA };