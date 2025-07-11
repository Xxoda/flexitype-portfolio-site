import { useMemo } from "react";
import { Project } from "@/types";
import { PROJECT_IMAGES, CATEGORIES } from "@/constants";

export const useProjects = () => {
  const projects: Project[] = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: `Проект ${i + 1}`,
        image: PROJECT_IMAGES[i % PROJECT_IMAGES.length],
        images: PROJECT_IMAGES,
        description: `Описание проекта ${i + 1}. Креативное решение в области дизайна, которое воплощает современные тенденции и инновационный подход.`,
        category: CATEGORIES[i % CATEGORIES.length],
      })),
    [],
  );

  return projects;
};
