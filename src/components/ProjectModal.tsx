import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  currentImageIndex: number;
  onClose: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  onImageSelect: (index: number) => void;
}

const ProjectModal = ({
  project,
  currentImageIndex,
  onClose,
  onNextImage,
  onPrevImage,
  onImageSelect,
}: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-satoshi text-2xl text-flexitype-blue">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={project.images[currentImageIndex]}
                alt={project.title}
                className="w-full rounded-lg aspect-square object-cover"
              />
              <button
                onClick={onPrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-flexitype-white/90 text-flexitype-blue p-2 rounded-full hover:bg-flexitype-blue/20 transition-colors shadow-lg"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={onNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-flexitype-white/90 text-flexitype-blue p-2 rounded-full hover:bg-flexitype-blue/20 transition-colors shadow-lg"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => onImageSelect(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                    currentImageIndex === index
                      ? "border-flexitype-blue"
                      : "border-flexitype-blue/30"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <span className="text-flexitype-blue font-inter font-medium text-sm">
                {project.category}
              </span>
              <h3 className="font-satoshi text-xl text-flexitype-black mt-2">
                {project.title}
              </h3>
            </div>

            <p className="text-flexitype-black/80 font-inter leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-satoshi font-semibold text-flexitype-blue">
                Детали проекта:
              </h4>
              <ul className="space-y-2 text-flexitype-black/70 font-inter">
                <li>• Современный подход к дизайну</li>
                <li>• Адаптивная верстка</li>
                <li>• Пользовательский интерфейс</li>
                <li>• Брендинг и айдентика</li>
              </ul>
            </div>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-flexitype-blue/30 text-flexitype-blue hover:bg-flexitype-blue/10"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
