// Заявки (обратная связь и т.п.) хранятся в localStorage под ключом "aurex_requests"
const KEY = "aurex_requests";

// Сохраняет заявку. Возвращает true, если получилось сохранить.
export function saveRequest(type, data) {
  try {
    // Читаем свежее значение, чтобы не затереть заявки из других мест приложения
    const saved = JSON.parse(localStorage.getItem(KEY));
    const list = Array.isArray(saved) ? saved : [];
    list.push({
      id: `req-${Date.now()}`,
      type,
      createdAt: new Date().toISOString(),
      ...data,
    });
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

// Возвращает все сохранённые заявки (пустой массив, если их нет или хранилище недоступно)
export function getRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
