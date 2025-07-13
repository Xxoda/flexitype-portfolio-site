import { useMemo } from "react";
import { Project } from "@/types";

const PROJECT_DATA = [
  {
    id: 1,
    title: "Инфографика для маркетплейсов",
    image: "https://ltdfoto.ru/images/2025/07/13/image-412.png",
    description: "Создание привлекательной инфографики для товаров на маркетплейсах",
    category: "Графический дизайн"
  },
  {
    id: 2,
    title: "Билборды / Витрины / Стенды",
    image: "https://ltdfoto.ru/images/2025/07/13/image-413.png",
    description: "Дизайн наружной рекламы: билборды, витрины и рекламные стенды",
    category: "Наружная реклама"
  },
  {
    id: 3,
    title: "HTML-письма",
    image: "https://ltdfoto.ru/images/2025/07/13/image-414.png",
    description: "Создание адаптивных HTML-шаблонов для email-рассылок",
    category: "Email-маркетинг"
  },
  {
    id: 4,
    title: "VK-дизайн",
    image: "https://ltdfoto.ru/images/2025/07/13/image-415.png",
    description: "Оформление сообществ и контента для социальной сети ВКонтакте",
    category: "Соцсети"
  },
  {
    id: 5,
    title: "Обложки треков",
    image: "https://ltdfoto.ru/images/2025/07/13/image-416.png",
    description: "Дизайн обложек для музыкальных треков и альбомов",
    category: "Музыкальный дизайн"
  },
  {
    id: 6,
    title: "Twitch",
    image: "https://ltdfoto.ru/images/2025/07/13/image-417.png",
    description: "Оформление стримов: оверлеи, панели и графика для Twitch",
    category: "Стриминг"
  },
  {
    id: 7,
    title: "Посты",
    image: "https://ltdfoto.ru/images/2025/07/13/image-418.png",
    description: "Создание постов для социальных сетей и блогов",
    category: "Контент"
  },
  {
    id: 8,
    title: "Буклеты",
    image: "https://ltdfoto.ru/images/2025/07/13/image-419.png",
    description: "Дизайн информационных буклетов и брошюр",
    category: "Полиграфия"
  },
  {
    id: 9,
    title: "Превью видео",
    image: "https://ltdfoto.ru/images/2025/07/13/image-420.png",
    description: "Создание привлекательных превью для видеоконтента",
    category: "Видеодизайн"
  },
  {
    id: 10,
    title: "Упаковка и этикетка",
    image: "https://ltdfoto.ru/images/2025/07/13/image-421.png",
    description: "Дизайн упаковки товаров и этикеток",
    category: "Упаковка"
  },
  {
    id: 11,
    title: "Инструкция / Чек-лист",
    image: "https://ltdfoto.ru/images/2025/07/13/image-422.png",
    description: "Создание понятных инструкций и чек-листов",
    category: "Документация"
  },
  {
    id: 12,
    title: "Авто",
    image: "https://ltdfoto.ru/images/2025/07/13/image-423.png",
    description: "Дизайн для автомобильной тематики и автосервисов",
    category: "Автомобили"
  },
  {
    id: 13,
    title: "Меню / Прайс",
    image: "https://ltdfoto.ru/images/2025/07/13/image-424.png",
    description: "Создание меню для ресторанов и прайс-листов",
    category: "Ресторанный бизнес"
  },
  {
    id: 14,
    title: "Листовка",
    image: "https://ltdfoto.ru/images/2025/07/13/image-425.png",
    description: "Дизайн рекламных листовок и флаеров",
    category: "Полиграфия"
  },
  {
    id: 15,
    title: "UX/UI",
    image: "https://ltdfoto.ru/images/2025/07/13/image-426.png",
    description: "Проектирование пользовательских интерфейсов и опыта",
    category: "Веб-дизайн"
  },
  {
    id: 16,
    title: "Логотип",
    image: "https://ltdfoto.ru/images/2025/07/13/image-408.png",
    description: "Создание уникальных логотипов и фирменных знаков",
    category: "Брендинг"
  },
  {
    id: 17,
    title: "Брендбук",
    image: "https://ltdfoto.ru/images/2025/07/13/image-409.png",
    description: "Разработка полного руководства по фирменному стилю",
    category: "Брендинг"
  },
  {
    id: 18,
    title: "Визитки",
    image: "https://ltdfoto.ru/images/2025/07/13/image-410.png",
    description: "Дизайн стильных и запоминающихся визитных карточек",
    category: "Полиграфия"
  },
  {
    id: 19,
    title: "PDF-презентации",
    image: "https://ltdfoto.ru/images/2025/07/13/image-411.png",
    description: "Создание профессиональных презентаций в формате PDF",
    category: "Презентации"
  },
  {
    id: 20,
    title: "Каталог",
    image: "https://ltdfoto.ru/images/2025/07/13/image910b412476d01958.png",
    description: "Дизайн товарных каталогов и справочников",
    category: "Полиграфия"
  }
];

export const useProjects = (): Project[] => {
  const projects: Project[] = useMemo(
    () => PROJECT_DATA.map(item => ({
      ...item,
      images: [item.image],
      subtitle: ""
    })),
    [],
  );

  return projects;
};

export { PROJECT_DATA };