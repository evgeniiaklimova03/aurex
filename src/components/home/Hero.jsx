import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Container from "../ui/Container";
import "./Hero.css";

function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const text = query.trim();
    navigate(text ? `/catalog?search=${encodeURIComponent(text)}` : "/catalog");
  }

  return (
    <section className="hero">
      <Container>
        <div className="hero__content">
          <h1 className="hero__title">Найдите автомобиль, который вам подходит</h1>
          <p className="hero__subtitle">
            Подборка проверенных автомобилей с понятными условиями. Удобный поиск, сравнение и сохранение в избранное.
          </p>

          <form className="hero__search" onSubmit={handleSubmit} role="search">
            <label className="hero__field">
              <Search size={20} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Марка, модель или ключевое слово"
                aria-label="Поиск автомобиля"
              />
            </label>
            <button type="submit" className="hero__button">
              Найти
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
