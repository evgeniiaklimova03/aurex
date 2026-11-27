import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Scale, User, Menu, X } from "lucide-react";
import Container from "../ui/Container";
import { useApp } from "../../context/AppContext";
import "./Header.css";

function Header() {
  const { favorites, compare } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  // Закрываем мобильное меню по Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
            AUREX
          </Link>

          <Link to="/account" className="header__login">
            <User size={16} aria-hidden="true" />
            Войти
          </Link>

          <button
            type="button"
            className="header__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>

          {/* Клик по любой ссылке внутри меню закрывает его */}
          <nav
            id="main-nav"
            className={`header__nav${menuOpen ? " is-open" : ""}`}
            aria-label="Основная навигация"
            onClick={() => setMenuOpen(false)}
          >
            <NavLink to="/catalog">Каталог</NavLink>
            <NavLink to="/compare">
              <Scale size={16} aria-hidden="true" />
              Сравнение
              {compare.length > 0 && (
                <span className="header__badge" aria-label={`в сравнении: ${compare.length}`}>
                  {compare.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/favorites">
              <Heart size={16} aria-hidden="true" />
              Избранное
              {favorites.length > 0 && (
                <span className="header__badge" aria-label={`в избранном: ${favorites.length}`}>
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/about">О платформе</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
