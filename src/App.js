import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/nav";
import About from "./pages/About";
import ProductGrid from "./pages/ProductGrid";
import Allproducts from "./components/Allproducts";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/login";
import Cart from "./pages/cart";
import useCart from "./components/useCart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/orderSummary";

import "./styles/style.css";
import Footer from "./components/Footer";

// 引入產品
function App() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);

  const filterProducts = (category) => {
    setCurrentCategory(category);
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  // 通过傳遞 cart 和 setCart 到 useCart 来使用它
  const { addToCart } = useCart(cart, setCart);

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            return null; // 数量为0时返回null，以便在下一步过滤掉
          }
        }
        return item;
      })
      .filter((item) => item !== null); // 过滤掉为null的商品
    setCart(updatedCart);
  };
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="top">歡迎來到 貳拾飾!</div>
      <Nav filterProducts={filterProducts} itemCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductGrid
              products={Allproducts}
              currentCategory={currentCategory}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              totalAmount={totalAmount}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setOrderInfo={setOrderInfo} />}
        />
        <Route
          path="/orderSummary"
          element={
            <OrderSummary orderInfo={orderInfo} totalAmount={totalAmount} />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
