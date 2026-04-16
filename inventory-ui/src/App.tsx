import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";

function App() {
  return (
  <BrowserRouter>
    <Navbar />
    <div className="container ">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;