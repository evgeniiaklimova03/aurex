import { useState, useEffect } from "react";

// Работает как useState, но значение сохраняется в localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      // localStorage недоступен или в нём битые данные
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // не удалось сохранить — приложение продолжает работать без сохранения
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
