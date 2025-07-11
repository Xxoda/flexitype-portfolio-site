export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  images: string[];
  description: string;
  category: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
