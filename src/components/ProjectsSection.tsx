import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectsSection = ({
  projects,
  onProjectClick,
}: ProjectsSectionProps) => {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-flexitype-gray relative"
    >
      <div className="container mx-auto">
        <h2 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl text-center text-flexitype-blue mb-8 sm:mb-12">
          Наши проекты
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => onProjectClick(project)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="aspect-square overflow-hidden rounded-lg mb-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-satoshi font-bold text-gray-900 text-sm sm:text-base leading-tight">
                    {project.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
