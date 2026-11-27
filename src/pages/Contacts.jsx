import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Container from "../components/ui/Container";
import { saveRequest } from "../utils/requests";
import "./Contacts.css";

const INFO = [
  { icon: Phone, label: "Телефон", value: "+7 (900) 000-00-00" },
  { icon: Mail, label: "Email", value: "hello@aurex.example" },
  { icon: MapPin, label: "Адрес", value: "Москва, ул. Примерная, 1" },
  { icon: Clock, label: "Часы работы", value: "Пн–Пт, 10:00–19:00" },
];

const FAQ = [
  {
    q: "Как связаться с продавцом?",
    a: "Откройте страницу автомобиля и нажмите «Показать телефон». Там же указано имя продавца и его тип: автосалон или частное лицо.",
  },
  {
    q: "Безопасно ли покупать на AUREX?",
    a: "Мы показываем всю информацию об автомобиле и продавце, но рекомендуем всегда осматривать машину лично и проверять документы до оплаты.",
  },
  {
    q: "Можно ли сравнить несколько автомобилей?",
    a: "Да, добавьте до трёх автомобилей кнопкой «В сравнение». На странице «Сравнение» различающиеся характеристики подсвечены.",
  },
  {
    q: "Где хранится мой список избранного?",
    a: "Избранное и сравнение сохраняются в вашем браузере. Если очистить данные браузера, списки пропадут.",
  },
  {
    q: "Это настоящий сервис?",
    a: "Нет, AUREX — учебный демонстрационный проект. Объявления, продавцы, телефоны и адрес на сайте вымышленные.",
  },
];

function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "ok" | "error"

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const saved = saveRequest("contact", {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    if (saved) {
      setForm({ name: "", email: "", message: "" });
      setStatus("ok");
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="contacts">
      <Container>
        <h1 className="contacts__title">Контакты</h1>

        <div className="contacts__layout">
          <ul className="contacts__info">
            {INFO.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <span className="contacts__icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="contacts__label">{item.label}</span>
                    <span className="contacts__value">{item.value}</span>
                  </div>
                </li>
              );
            })}
          </ul>

          <form className="contacts__form" onSubmit={handleSubmit}>
            <h2>Напишите нам</h2>

            <div className="field">
              <label htmlFor="c-name">Имя</label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="c-message">Сообщение</label>
              <textarea
                id="c-message"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="contacts__submit">
              Отправить
            </button>

            {status === "ok" && (
              <p className="contacts__status contacts__status--ok" role="status">
                Спасибо! Сообщение сохранено. Демо: оно остаётся только в вашем
                браузере и никуда не отправляется.
              </p>
            )}
            {status === "error" && (
              <p className="contacts__status contacts__status--error" role="alert">
                Не удалось сохранить сообщение: хранилище браузера недоступно.
              </p>
            )}
          </form>
        </div>

        <h2 className="contacts__faq-title">Частые вопросы</h2>
        <div className="faq">
          {FAQ.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Contacts;
