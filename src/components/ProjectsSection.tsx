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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-flexitype-white border-flexitype-blue/20 hover:border-flexitype-blue/50 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg hover:shadow-xl"
              onClick={() => onProjectClick(project)}
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-satoshi font-semibold text-lg sm:text-xl text-flexitype-black mb-2">
                    {project.title}
                  </h3>
                  <p className="text-flexitype-blue font-inter text-sm">
                    {project.category}
                  </p>
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
