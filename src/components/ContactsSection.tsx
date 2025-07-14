import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { FormData } from "@/types";
import { useState, useEffect } from "react";

interface ContactsSectionProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onFormSubmit: (e: React.FormEvent) => void;
}

const ContactsSection = ({
  formData,
  onFormDataChange,
  onFormSubmit,
}: ContactsSectionProps) => {
  const [contactsData, setContactsData] = useState({
    title: 'Контакты',
    formTitle: 'Напишите нам',
    socialTitle: 'Соцсети',
    email: 'info@flexitype.com',
    links: [
      { name: 'Telegram', url: 'https://t.me/flexitype', icon: 'MessageCircle' },
      { name: 'VKontakte', url: 'https://vk.com/flexitype', icon: 'Users' },
      { name: 'WhatsApp', url: 'https://wa.me/your-number', icon: 'Phone' },
      { name: 'E-mail', url: 'mailto:info@flexitype.com', icon: 'Mail' }
    ]
  });

  useEffect(() => {
    const savedData = localStorage.getItem('admin-contacts');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setContactsData(parsedData);
      } catch (error) {
        console.error('Error parsing saved contacts data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem('admin-contacts');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setContactsData(parsedData);
        } catch (error) {
          console.error('Error parsing saved contacts data:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const checkForUpdates = setInterval(() => {
      handleStorageChange();
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkForUpdates);
    };
  }, []);

  return (
    <section
      id="contacts"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-flexitype-white"
    >
      <div className="container mx-auto">
        <h2 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl text-center text-flexitype-blue mb-8 sm:mb-12">
          {contactsData.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="font-satoshi font-semibold text-xl sm:text-2xl text-flexitype-black mb-6">
              {contactsData.formTitle}
            </h3>
            <form onSubmit={onFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-flexitype-black">
                  Имя
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    onFormDataChange({ ...formData, name: e.target.value })
                  }
                  className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-flexitype-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    onFormDataChange({ ...formData, email: e.target.value })
                  }
                  className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-flexitype-black">
                  Сообщение
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    onFormDataChange({ ...formData, message: e.target.value })
                  }
                  className="bg-flexitype-white border-flexitype-blue/30 text-flexitype-black min-h-32"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-flexitype-blue hover:bg-flexitype-blue/80 text-white"
              >
                Отправить сообщение
              </Button>
            </form>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="font-satoshi font-semibold text-xl sm:text-2xl text-flexitype-black mb-6">
              {contactsData.socialTitle}
            </h3>
            <div className="space-y-4">
              {contactsData.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="flex items-center space-x-4 text-flexitype-black hover:text-flexitype-blue transition-colors group p-4 rounded-lg border border-flexitype-blue/20 hover:border-flexitype-blue/50 bg-flexitype-white hover:bg-flexitype-gray"
                >
                  <Icon
                    name={link.icon as any}
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-inter">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;