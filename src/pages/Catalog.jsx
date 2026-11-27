import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Container from "../components/ui/Container";
import CarCard from "../components/cars/CarCard";
import cars from "../data/cars.json";
import "./Catalog.css";

// Слово «объявление» в нужной форме: 1 объявление, 2 объявления, 5 объявлений
function pluralAds(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "объявление";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "объявления";
  return "объявлений";
}

// Все условия применяются одновременно (логическое И)
function filterCars(list, { searchQuery, minPrice, maxPrice, bodyType }) {
  const query = searchQuery.trim().toLowerCase();

  return list.filter((car) => {
    // Ищем по "Марка Модель", чтобы находилось и "BMW", и "X5", и "BMW X5"
    if (query && !`${car.brand} ${car.model}`.toLowerCase().includes(query)) {
      return false;
    }
    if (minPrice !== "" && car.price < Number(minPrice)) return false;
    if (maxPrice !== "" && car.price > Number(maxPrice)) return false;
    if (bodyType !== "all" && car.bodyType !== bodyType) return false;
    return true;
  });
}

function Catalog() {
  // Источник правды — адресная строка: ?search=bmw&minPrice=1000000&maxPrice=5000000&body=SUV
  const [searchParams, setSearchParams] = useSearchParams();
  // На экранах уже 1024px фильтры спрятаны за кнопкой
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const bodyType = searchParams.get("body") || "all";

  // Меняет один параметр в URL; пустые значения из адреса убираются
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value === "" || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    // replace: чтобы каждая набранная буква не засоряла историю браузера
    setSearchParams(next, { replace: true });
  }

  // Сколько фильтров сейчас включено (для значка на кнопке)
  const activeFilters = [searchQuery, minPrice, maxPrice, bodyType !== "all" ? bodyType : ""].filter(Boolean).length;

  const filteredCars = filterCars(cars, { searchQuery, minPrice, maxPrice, bodyType });

  function resetFilters() {
    setSearchParams({}, { replace: true });
  }

  return (
    <section className="catalog">
      <Container>
        <div className="catalog__layout">
          <button
            type="button"
            className="catalog__filters-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            Фильтры
            {activeFilters > 0 && <span className="catalog__filters-badge">{activeFilters}</span>}
          </button>

          <aside
            id="catalog-filters"
            className={`catalog__filters${filtersOpen ? " is-open" : ""}`}
            aria-label="Фильтры"
          >
            <h2 className="catalog__filters-title">Фильтры</h2>

            <div className="filter">
              <label htmlFor="filter-search">Поиск по названию</label>
              <input
                id="filter-search"
                type="text"
                placeholder="Например, BMW X5"
                value={searchQuery}
                onChange={(e) => updateParam("search", e.target.value)}
              />
            </div>

            <div className="filter">
              <span className="filter__label">Цена, ₽</span>
              <div className="filter__range">
                <input
                  type="number"
                  min="0"
                  placeholder="от"
                  aria-label="Цена от"
                  value={minPrice}
                  onChange={(e) => updateParam("minPrice", e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="до"
                  aria-label="Цена до"
                  value={maxPrice}
                  onChange={(e) => updateParam("maxPrice", e.target.value)}
                />
              </div>
            </div>

            <div className="filter">
              <label htmlFor="filter-body">Тип кузова</label>
              <select
                id="filter-body"
                value={bodyType}
                onChange={(e) => updateParam("body", e.target.value)}
              >
                <option value="all">Любой</option>
                <option value="Sedan">Седан</option>
                <option value="SUV">Кроссовер / внедорожник</option>
                <option value="Hatchback">Хэтчбек</option>
              </select>
            </div>

            <button type="button" className="catalog__reset" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </aside>

          <div className="catalog__content">
            <div className="catalog__head">
              <h1 className="catalog__title">Каталог автомобилей</h1>
              <p className="catalog__count" aria-live="polite">
                {filteredCars.length} {pluralAds(filteredCars.length)}
              </p>
            </div>

            {filteredCars.length > 0 ? (
              <div className="catalog__grid">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="catalog__empty">
                <h2>Ничего не найдено</h2>
                <p>Попробуйте изменить параметры поиска или сбросить фильтры.</p>
                <button type="button" className="catalog__reset" onClick={resetFilters}>
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Catalog;
