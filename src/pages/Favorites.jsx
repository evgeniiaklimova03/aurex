import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Container from "../components/ui/Container";
import CarCard from "../components/cars/CarCard";
import cars from "../data/cars.json";
import { useApp } from "../context/AppContext";
import { pluralCars } from "../utils/carLabels";
import "./Favorites.css";

function Favorites() {
  const { favorites, clearFavorites } = useApp();

  // Сохраняем порядок добавления; id, которых нет в данных, пропускаем
  const favoriteCars = favorites
    .map((id) => cars.find((c) => c.id === id))
    .filter(Boolean);

  function handleClear() {
    if (window.confirm("Очистить избранное? Все сохранённые автомобили будут удалены из списка.")) {
      clearFavorites();
    }
  }

  return (
    <section className="favorites">
      <Container>
        {favoriteCars.length > 0 ? (
          <>
            <div className="favorites__head">
              <div>
                <h1 className="favorites__title">Избранное</h1>
                <p className="favorites__count">
                  {favoriteCars.length} {pluralCars(favoriteCars.length)}
                </p>
              </div>
              <button type="button" className="favorites__clear" onClick={handleClear}>
                Очистить избранное
              </button>
            </div>

            <div className="favorites__grid">
              {favoriteCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </>
        ) : (
          <div className="favorites__empty">
            <Heart size={40} aria-hidden="true" />
            <h1>В избранном пока пусто</h1>
            <p>Нажимайте «В избранное» на странице автомобиля, чтобы сохранить понравившиеся варианты.</p>
            <Link to="/catalog" className="favorites__cta">
              Перейти в каталог
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Favorites;
