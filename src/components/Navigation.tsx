import { useState } from "react";
import Icon from "@/components/ui/icon";
import { LOGO_URL, NAVIGATION_ITEMS } from "@/constants";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-flexitype-white/95 backdrop-blur-sm z-50 border-b border-flexitype-blue/20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={LOGO_URL}
              alt="Flexitype"
              className="w-8 h-8 object-contain"
            />
            <span className="font-satoshi font-bold text-xl text-flexitype-black">
              Flexitype
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name="Menu" size={24} className="text-flexitype-black" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-flexitype-blue/20 pt-4">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left py-2 text-flexitype-black hover:text-flexitype-blue transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
