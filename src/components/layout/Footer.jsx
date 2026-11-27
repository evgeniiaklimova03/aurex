import { Link } from "react-router-dom";
import Container from "../ui/Container";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              AUREX
            </Link>
            <p>
              Маркетплейс автомобилей с понятным выбором, сравнением и
              прозрачными условиями. Демо-проект для портфолио.
            </p>
          </div>

          <div className="footer__columns">
            <div className="footer__col">
              <h3>Каталог</h3>
              <Link to="/catalog">Все автомобили</Link>
              <Link to="/compare">Сравнение</Link>
              <Link to="/favorites">Избранное</Link>
            </div>
            <div className="footer__col">
              <h3>Покупателям</h3>
              <Link to="/account">Личный кабинет</Link>
              <Link to="/contacts">Связаться с нами</Link>
            </div>
            <div className="footer__col">
              <h3>Компания</h3>
              <Link to="/about">О платформе</Link>
              <Link to="/contacts">Контакты</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} AUREX. Учебный проект, не является
          реальным сервисом.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
