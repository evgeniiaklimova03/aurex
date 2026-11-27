import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Account from "./pages/Account";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CarDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Layout>
  );
}

export default App;
