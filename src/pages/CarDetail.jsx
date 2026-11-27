import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Scale, Phone } from "lucide-react";
import Container from "../components/ui/Container";
import CarCard from "../components/cars/CarCard";
import cars from "../data/cars.json";
import { useApp, COMPARE_LIMIT } from "../context/AppContext";
import {
  ENGINE,
  TRANSMISSION,
  DRIVE,
  BODY,
  SELLER,
  formatPrice,
  formatMileage,
  imageUrl,
} from "../utils/carLabels";
import "./CarDetail.css";

// В данных нет поля description, поэтому собираем текст из характеристик
function getDescription(car) {
  if (car.description) return car.description;
  const engine = (ENGINE[car.engineType] || car.engineType).toLowerCase();
  const gearbox = (TRANSMISSION[car.transmission] || car.transmission).toLowerCase();
  const drive = (DRIVE[car.drive] || car.drive).toLowerCase();
  return (
    `${car.brand} ${car.model} ${car.year} года в хорошем состоянии. ` +
    `Пробег ${formatMileage(car.mileage)}, ${engine} двигатель, ${gearbox} КПП, ${drive} привод. ` +
    `Автомобиль обслуживался вовремя, без серьёзных вложений. ` +
    `Возможен осмотр и тест-драйв по предварительной договорённости.`
  );
}

function CarDetailView({ car }) {
  const [activeImage, setActiveImage] = useState(0);
  const [phoneShown, setPhoneShown] = useState(false);
  const [compareMessage, setCompareMessage] = useState("");
  const { isFavorite, isInCompare, toggleFavorite, toggleCompare } = useApp();

  const inFavorites = isFavorite(car.id);
  const inCompare = isInCompare(car.id);

  function handleCompare() {
    const ok = toggleCompare(car.id);
    setCompareMessage(
      ok ? "" : `В сравнение можно добавить не более ${COMPARE_LIMIT} автомобилей.`
    );
  }

  const title = `${car.brand} ${car.model} ${car.year}`;

  const specs = [
    { label: "Год", value: car.year },
    { label: "Пробег", value: formatMileage(car.mileage) },
    { label: "Двигатель", value: ENGINE[car.engineType] || car.engineType },
    { label: "КПП", value: TRANSMISSION[car.transmission] || car.transmission },
    { label: "Привод", value: DRIVE[car.drive] || car.drive },
    { label: "Кузов", value: BODY[car.bodyType] || car.bodyType },
  ];

  const similar = cars
    .filter((c) => c.bodyType === car.bodyType && c.id !== car.id)
    .slice(0, 3);

  return (
    <section className="detail">
      <Container>
        <Link to="/catalog" className="detail__back">
          <ArrowLeft size={16} aria-hidden="true" />
          Назад в каталог
        </Link>

        <h1 className="detail__title">{title}</h1>

        <div className="detail__layout">
          <div className="detail__gallery">
            <div className="detail__main-image">
              <img src={imageUrl(car.images[activeImage])} alt={title} />
            </div>
            <div className="detail__thumbs">
              {car.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`detail__thumb${i === activeImage ? " is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Фото ${i + 1}`}
                >
                  <img src={imageUrl(src)} alt="" />
                </button>
              ))}
            </div>
          </div>

          <aside className="detail__side">
            <div className="panel">
              <p className="detail__price">{formatPrice(car.price)}</p>

              <div className="detail__actions">
                <button
                  type="button"
                  className={`detail__btn${inFavorites ? " is-on" : ""}`}
                  onClick={() => toggleFavorite(car.id)}
                  aria-pressed={inFavorites}
                >
                  <Heart
                    size={18}
                    fill={inFavorites ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                  {inFavorites ? "В избранном" : "В избранное"}
                </button>
                <button
                  type="button"
                  className={`detail__btn${inCompare ? " is-on" : ""}`}
                  onClick={handleCompare}
                  aria-pressed={inCompare}
                >
                  <Scale size={18} aria-hidden="true" />
                  {inCompare ? "В сравнении" : "В сравнение"}
                </button>
              </div>
              {compareMessage && (
                <p className="detail__note detail__note--warn" role="alert">
                  {compareMessage}
                </p>
              )}
            </div>

            <div className="panel">
              <h2 className="panel__title">Продавец</h2>
              <p className="detail__seller-name">{car.sellerName}</p>
              <p className="detail__seller-type">
                {SELLER[car.sellerType] || car.sellerType}
              </p>
              <button
                type="button"
                className="detail__phone"
                onClick={() => setPhoneShown(true)}
              >
                <Phone size={18} aria-hidden="true" />
                {phoneShown ? "+7 (900) 000-00-00" : "Показать телефон"}
              </button>
              {phoneShown && (
                <p className="detail__note">Демо-номер, не настоящий.</p>
              )}
            </div>
          </aside>

          <div className="detail__specs panel">
            <h2 className="panel__title">Характеристики</h2>
            <dl className="specs">
              {specs.map((s) => (
                <div className="specs__item" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="detail__desc panel">
            <h2 className="panel__title">Описание</h2>
            <p>{getDescription(car)}</p>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="detail__similar">
            <h2 className="detail__similar-title">Похожие автомобили</h2>
            <div className="detail__similar-grid">
              {similar.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function CarDetail() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);

  // При переходе на другую машину (например, из «Похожих») — наверх страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!car) {
    return (
      <section className="detail">
        <Container>
          <div className="detail__missing">
            <h1>Автомобиль не найден</h1>
            <p>Возможно, объявление удалено или ссылка введена неверно.</p>
            <Link to="/catalog" className="detail__missing-link">
              Вернуться в каталог
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  // key сбрасывает выбранное фото и кнопки при смене машины
  return <CarDetailView key={car.id} car={car} />;
}

export default CarDetail;
