import { useMemo } from "react";
import { Project } from "@/types";
import {
  PROJECT_IMAGES,
  CATEGORIES,
  PROJECT_TITLES,
  PROJECT_DESCRIPTIONS,
  PROJECT_SUBTITLES,
  PORTFOLIO_IMAGES,
} from "@/constants";

export const useProjects = () => {
  const projects: Project[] = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: PROJECT_TITLES[i % PROJECT_TITLES.length],
        subtitle: PROJECT_SUBTITLES[i % PROJECT_SUBTITLES.length],
        image: PROJECT_IMAGES[i % PROJECT_IMAGES.length],
        images: PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length] || PROJECT_IMAGES,
        description: PROJECT_DESCRIPTIONS[i % PROJECT_DESCRIPTIONS.length],
        category: CATEGORIES[i % CATEGORIES.length],
      })),
    [],
  );

  return projects;
};
