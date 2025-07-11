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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg hover:shadow-cyan-400/20 hover:shadow-xl relative overflow-hidden"
              onClick={() => onProjectClick(project)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-3 sm:p-4 relative z-10">
                <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-gradient-to-br from-slate-800 to-slate-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-satoshi font-bold text-cyan-400 text-sm sm:text-base leading-tight">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-slate-400 font-inter text-xs leading-tight">
                      {project.subtitle}
                    </p>
                  )}
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
