import { useState } from "react";
import { Project, FormData } from "@/types";
import { useProjects } from "@/hooks/useProjects";
import { scrollToSection } from "@/utils/scroll";

// Components
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const projects = useProjects();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Сообщение отправлено!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleProjectOpen = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  };

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-flexitype-white text-flexitype-black">
      <Navigation scrollToSection={scrollToSection} />

      <HeroSection scrollToSection={scrollToSection} />

      <AboutSection />

      <ProjectsSection projects={projects} onProjectClick={handleProjectOpen} />

      <ContactsSection
        formData={formData}
        onFormDataChange={setFormData}
        onFormSubmit={handleFormSubmit}
      />

      <Footer />

      <ProjectModal
        project={selectedProject}
        currentImageIndex={currentImageIndex}
        onClose={handleProjectClose}
        onNextImage={handleNextImage}
        onPrevImage={handlePrevImage}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default Index;
