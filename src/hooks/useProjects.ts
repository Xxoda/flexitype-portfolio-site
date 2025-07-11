import { useMemo } from "react";
import { Project } from "@/types";
import {
  PROJECT_IMAGES,
  CATEGORIES,
  PROJECT_TITLES,
  PROJECT_DESCRIPTIONS,
} from "@/constants";

export const useProjects = () => {
  const projects: Project[] = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: PROJECT_TITLES[i % PROJECT_TITLES.length],
        image: PROJECT_IMAGES[i % PROJECT_IMAGES.length],
        images: PROJECT_IMAGES,
        description: PROJECT_DESCRIPTIONS[i % PROJECT_DESCRIPTIONS.length],
        category: CATEGORIES[i % CATEGORIES.length],
      })),
    [],
  );

  return projects;
};
