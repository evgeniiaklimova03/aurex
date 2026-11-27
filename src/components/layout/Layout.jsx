import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import cars from "../../data/cars.json";

const PAGE_TITLES = {
  "/": "Главная",
  "/catalog": "Каталог",
  "/favorites": "Избранное",
  "/compare": "Сравнение",
  "/about": "О платформе",
  "/contacts": "Контакты",
  "/account": "Личный кабинет",
};

function getPageTitle(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  if (path.startsWith("/catalog/")) {
    const car = cars.find((c) => c.id === path.split("/")[2]);
    return car ? `${car.brand} ${car.model}` : "Автомобиль не найден";
  }
  return PAGE_TITLES[path] || "Страница не найдена";
}

function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${getPageTitle(pathname)} — AUREX`;
  }, [pathname]);

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content" className="layout__main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
