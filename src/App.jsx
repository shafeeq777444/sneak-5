import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './user-authentication/Register.jsx';
import Login from './user-authentication/Login.jsx';
import Home from "./Home/Home.jsx";
import MenCard from "./Product/MenCard";
import WomenCard from "./Product/WomenCard";
import { ProductProvider } from "./Product/ProductContext";
import { CartProvider } from "./cart/CartContext.jsx";
import Cart from "./cart/Cart";
import ResponsiveCarousel from '/src/Home/ResponsiveCarousel.jsx'
import NavBar from "./Home/NavBar.jsx";

function App() {
  return (

    <ProductProvider>
    <CartProvider>
      <Router>
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />}>
                  <Route index element={<ResponsiveCarousel />} />
                  <Route path="men" element={<MenCard />} />
                  <Route path="women" element={<WomenCard />} />
                  <Route path="cart" element={<Cart />} />
              </Route>
          </Routes>
      </Router>
      </CartProvider>
  </ProductProvider>
  );
}

export default App;
