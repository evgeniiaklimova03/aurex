import { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import Container from "../components/ui/Container";
import { getRequests } from "../utils/requests";
import "./Account.css";

const TABS = [
  { id: "profile", label: "Профиль" },
  { id: "requests", label: "Мои заявки" },
  { id: "settings", label: "Настройки" },
];

const REQUEST_TYPES = {
  contact: "Обратная связь",
};

// Название заявки: тема обращения или начало сообщения
function getRequestTitle(req) {
  if (req.carTitle) return req.carTitle;
  const type = REQUEST_TYPES[req.type] || "Обращение";
  const text = (req.message || "").trim();
  if (!text) return type;
  return `${type}: ${text.length > 60 ? text.slice(0, 60) + "…" : text}`;
}

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ru-RU", { dateStyle: "long", timeStyle: "short" });
}

function ProfileTab() {
  return (
    <div className="panel profile">
      <div className="profile__avatar" aria-hidden="true">ИИ</div>
      <div className="profile__info">
        <p className="profile__name">Иван Иванов</p>
        <p className="profile__email">ivan@example.com</p>
      </div>
      <button
        type="button"
        className="account__secondary"
        onClick={() => alert("Функция в разработке")}
      >
        Редактировать
      </button>
    </div>
  );
}

function RequestsTab() {
  // Читаем заявки при открытии вкладки, новые — сверху
  const [requests] = useState(() => getRequests().slice().reverse());

  if (requests.length === 0) {
    return (
      <div className="panel account__empty">
        <Inbox size={40} aria-hidden="true" />
        <h2>У вас пока нет заявок</h2>
        <p>Здесь появятся ваши обращения, например сообщения из раздела «Контакты».</p>
        <Link to="/catalog" className="account__primary">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <ul className="requests">
      {requests.map((req) => (
        <li className="request" key={req.id}>
          <div>
            <p className="request__title">{getRequestTitle(req)}</p>
            <p className="request__date">{formatDate(req.createdAt)}</p>
          </div>
          <span className="request__status">Отправлена</span>
        </li>
      ))}
    </ul>
  );
}

// Переключатель, пока только визуальный
function Switch({ id, label, hint, checked, onChange }) {
  return (
    <div className="setting">
      <div>
        <label htmlFor={id} className="setting__label">{label}</label>
        <p className="setting__hint">{hint}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`switch${checked ? " is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch__thumb" />
      </button>
    </div>
  );
}

function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <div className="panel">
      <Switch
        id="set-notifications"
        label="Уведомления"
        hint="Демо: ничего не отправляется."
        checked={notifications}
        onChange={setNotifications}
      />
      <Switch
        id="set-dark"
        label="Тёмная тема"
        hint="Демо: сайт пока только в тёмной теме."
        checked={darkTheme}
        onChange={setDarkTheme}
      />
      <button
        type="button"
        className="account__secondary account__logout"
        onClick={() => alert("Вы вышли из демо-аккаунта")}
      >
        Выйти
      </button>
    </div>
  );
}

function Account() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <section className="account">
      <Container>
        <div className="account__head">
          <h1 className="account__title">Личный кабинет</h1>
          <span className="account__badge">Демо-режим</span>
        </div>

        <div className="tabs" role="tablist" aria-label="Разделы кабинета">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`tabs__item${activeTab === tab.id ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="account__content"
        >
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "requests" && <RequestsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </Container>
    </section>
  );
}

export default Account;
