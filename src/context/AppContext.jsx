import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const COMPARE_LIMIT = 3;

const AppContext = createContext(null);

// Если в localStorage лежит не массив (например, данные испортились), берём пустой
function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function AppProvider({ children }) {
  const [rawFavorites, setFavorites] = useLocalStorage("aurex_favorites", []);
  const [rawCompare, setCompare] = useLocalStorage("aurex_compare", []);

  const favorites = asArray(rawFavorites);
  const compare = asArray(rawCompare);

  function toggleFavorite(id) {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((x) => x !== id)
        : [...favorites, id]
    );
  }

  // Возвращает false, если сравнение уже заполнено и добавить нельзя
  function toggleCompare(id) {
    if (compare.includes(id)) {
      setCompare(compare.filter((x) => x !== id));
      return true;
    }
    if (compare.length >= COMPARE_LIMIT) {
      return false;
    }
    setCompare([...compare, id]);
    return true;
  }

  function clearFavorites() {
    setFavorites([]);
  }

  function removeFromCompare(id) {
    setCompare(compare.filter((x) => x !== id));
  }

  function clearCompare() {
    setCompare([]);
  }

  const value = {
    favorites,
    compare,
    toggleFavorite,
    toggleCompare,
    clearFavorites,
    removeFromCompare,
    clearCompare,
    isFavorite: (id) => favorites.includes(id),
    isInCompare: (id) => compare.includes(id),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp нужно использовать внутри <AppProvider>");
  }
  return context;
}
