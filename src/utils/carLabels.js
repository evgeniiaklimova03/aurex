// Подписи для значений из cars.json (на русском)

export const ENGINE = {
  petrol: "Бензин",
  diesel: "Дизель",
  electric: "Электро",
  hybrid: "Гибрид",
};

export const TRANSMISSION = {
  automatic: "Автомат",
  manual: "Механика",
};

export const DRIVE = {
  awd: "Полный",
  fwd: "Передний",
  rwd: "Задний",
};

export const BODY = {
  Sedan: "Седан",
  SUV: "Кроссовер / внедорожник",
  Hatchback: "Хэтчбек",
};

export const SELLER = {
  dealer: "Автосалон",
  private: "Частное лицо",
};

export function formatPrice(price) {
  return price.toLocaleString("ru-RU") + " ₽";
}

export function formatMileage(km) {
  return km.toLocaleString("ru-RU") + " км";
}

// 1 автомобиль, 2 автомобиля, 5 автомобилей
export function pluralCars(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "автомобиль";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "автомобиля";
  return "автомобилей";
}

// Путь к картинке с учётом base из vite.config.js (нужно для GitHub Pages: /aurex/)
export function imageUrl(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
