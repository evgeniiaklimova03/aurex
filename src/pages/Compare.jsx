import { Link } from "react-router-dom";
import { Scale, X } from "lucide-react";
import Container from "../components/ui/Container";
import cars from "../data/cars.json";
import { useApp } from "../context/AppContext";
import {
  ENGINE,
  TRANSMISSION,
  DRIVE,
  BODY,
  formatPrice,
  formatMileage,
  imageUrl,
} from "../utils/carLabels";
import "./Compare.css";

// raw — значение для сравнения, show — как показать пользователю
const ROWS = [
  { label: "Цена", raw: (c) => c.price, show: (c) => formatPrice(c.price) },
  { label: "Год", raw: (c) => c.year, show: (c) => c.year },
  { label: "Пробег", raw: (c) => c.mileage, show: (c) => formatMileage(c.mileage) },
  { label: "Двигатель", raw: (c) => c.engineType, show: (c) => ENGINE[c.engineType] || c.engineType },
  { label: "КПП", raw: (c) => c.transmission, show: (c) => TRANSMISSION[c.transmission] || c.transmission },
  { label: "Привод", raw: (c) => c.drive, show: (c) => DRIVE[c.drive] || c.drive },
  { label: "Кузов", raw: (c) => c.bodyType, show: (c) => BODY[c.bodyType] || c.bodyType },
];

function Compare() {
  const { compare, removeFromCompare, clearCompare } = useApp();

  const compareCars = compare
    .map((id) => cars.find((c) => c.id === id))
    .filter(Boolean);

  if (compareCars.length === 0) {
    return (
      <section className="compare">
        <Container>
          <div className="compare__empty">
            <Scale size={40} aria-hidden="true" />
            <h1>Нет автомобилей для сравнения</h1>
            <p>Добавьте до 3 автомобилей кнопкой «В сравнение» на странице автомобиля.</p>
            <Link to="/catalog" className="compare__cta">
              В каталог
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="compare">
      <Container>
        <div className="compare__head">
          <h1 className="compare__title">Сравнение</h1>
          <button type="button" className="compare__clear" onClick={clearCompare}>
            Очистить всё
          </button>
        </div>

        {compareCars.length === 1 && (
          <p className="compare__hint">
            Добавьте ещё хотя бы один автомобиль, чтобы увидеть различия.
          </p>
        )}

        {/* Обёртка даёт горизонтальную прокрутку на узких экранах */}
        <div className="compare__scroll">
          <table className="compare__table">
            <thead>
              <tr>
                <th scope="col" className="compare__corner">
                  <span className="visually-hidden">Характеристика</span>
                </th>
                {compareCars.map((car) => (
                  <th scope="col" key={car.id} className="compare__car">
                    <button
                      type="button"
                      className="compare__remove"
                      onClick={() => removeFromCompare(car.id)}
                      aria-label={`Удалить ${car.brand} ${car.model} из сравнения`}
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                    <img src={imageUrl(car.images[0])} alt="" />
                    <Link to={`/catalog/${car.id}`} className="compare__name">
                      {car.brand} {car.model}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const values = compareCars.map(row.raw);
                // Различие есть, только если машин больше одной и значения не совпадают
                const differs = values.length > 1 && new Set(values).size > 1;
                return (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {compareCars.map((car) => (
                      <td key={car.id} className={differs ? "is-diff" : "is-same"}>
                        {row.show(car)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="compare__legend">
          <span className="compare__swatch" aria-hidden="true" /> Различаются
          <span className="compare__legend-gap" /> Серым — одинаковые значения
        </p>
      </Container>
    </section>
  );
}

export default Compare;
