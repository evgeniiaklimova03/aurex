import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import {
  ENGINE,
  TRANSMISSION,
  formatPrice,
  formatMileage,
  imageUrl,
} from "../../utils/carLabels";
import { useApp } from "../../context/AppContext";
import "./CarCard.css";

function CarCard({ car }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(car.id);
  const title = `${car.brand} ${car.model} ${car.year}`;

  return (
    <article className="car-card">
      <div className="car-card__image">
        <img src={imageUrl(car.images[0])} alt={title} loading="lazy" />
        <button
          type="button"
          className={`car-card__fav${fav ? " is-active" : ""}`}
          aria-label={fav ? "Убрать из избранного" : "Добавить в избранное"}
          aria-pressed={fav}
          onClick={() => toggleFavorite(car.id)}
        >
          <Heart size={18} aria-hidden="true" fill={fav ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="car-card__body">
        <h3 className="car-card__title">
          {/* Ссылка растянута на всю карточку (см. CarCard.css) */}
          <Link to={`/catalog/${car.id}`} className="car-card__link">
            {title}
          </Link>
        </h3>
        <p className="car-card__price">{formatPrice(car.price)}</p>
        <p className="car-card__specs">
          {formatMileage(car.mileage)} · {ENGINE[car.engineType] || car.engineType} ·{" "}
          {TRANSMISSION[car.transmission] || car.transmission}
        </p>
      </div>
    </article>
  );
}

export default CarCard;
