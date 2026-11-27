import { Link } from "react-router-dom";
import { Search, Scale, MessageCircle, KeyRound } from "lucide-react";
import Container from "../components/ui/Container";
import "./About.css";

const STEPS = [
  {
    icon: Search,
    title: "Поиск",
    text: "Фильтруйте объявления по марке, цене и типу кузова и находите подходящие варианты.",
  },
  {
    icon: Scale,
    title: "Сравнение",
    text: "Добавьте до трёх автомобилей в сравнение и сразу увидьте, чем они отличаются.",
  },
  {
    icon: MessageCircle,
    title: "Связь с продавцом",
    text: "Откройте контакты продавца и договоритесь об осмотре и тест-драйве.",
  },
  {
    icon: KeyRound,
    title: "Покупка",
    text: "Оформите сделку и заберите автомобиль, зная всё о его состоянии.",
  },
];

const STATS = [
  { value: "12", label: "автомобилей" },
  { value: "500+", label: "продавцов" },
  { value: "98%", label: "довольных клиентов" },
];

function About() {
  return (
    <section className="about">
      <Container>
        <h1 className="about__title">О платформе AUREX</h1>

        <div className="about__text">
          <p>
            AUREX — маркетплейс, где выбор автомобиля превращается из долгого
            поиска по десяткам сайтов в понятный и приятный процесс. Мы собираем
            объявления в одном месте и показываем главное: цену, пробег,
            характеристики и продавца.
          </p>
          <p>
            Наша миссия — сделать покупку автомобиля прозрачной. Удобные
            фильтры, сравнение моделей и избранное помогают принимать решение
            спокойно, без спешки и лишнего шума.
          </p>
          <p className="about__demo">
            AUREX — учебный концептуальный проект для портфолио. Объявления,
            продавцы и цифры на этой странице демонстрационные.
          </p>
        </div>

        <h2 className="about__subtitle">Как это работает</h2>
        <ol className="steps">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li className="steps__item" key={step.title}>
                <span className="steps__icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="steps__number">Шаг {i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            );
          })}
        </ol>

        <dl className="stats">
          {STATS.map((s) => (
            <div className="stats__item" key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="about__note">Демо-данные.</p>

        <div className="about__cta">
          <Link to="/catalog" className="about__button">
            Перейти в каталог
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default About;
