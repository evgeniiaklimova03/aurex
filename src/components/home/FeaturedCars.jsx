import { Link } from "react-router-dom";
import Container from "../ui/Container";
import CarCard from "../cars/CarCard";
import cars from "../../data/cars.json";
import "./FeaturedCars.css";

function FeaturedCars() {
  const featured = cars.slice(0, 4);

  return (
    <section className="featured">
      <Container>
        <div className="featured__head">
          <h2 className="featured__title">Популярные автомобили</h2>
          <Link to="/catalog" className="featured__all">
            Смотреть все
          </Link>
        </div>

        <div className="featured__grid">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturedCars;
