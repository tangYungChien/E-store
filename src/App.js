import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/nav";
import About from "./pages/About";
import ProductGrid from "./pages/ProductGrid";
import Allproducts from "./components/Allproducts";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/login";
import Register from "./pages/Register";
import MemberPage from "./pages/MemberPage";
import Cart from "./pages/cart";
import useCart from "./components/useCart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/orderSummary";

import "./styles/style.css";
import Footer from "./components/Footer";

function App() {
  // 定義狀態，用於存儲當前的產品類別、購物車內容、訂單訊息和會員名稱
  const [currentCategory, setCurrentCategory] = useState("all"); //用於nav產品分類
  const [cart, setCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [memberName, setMemberName] = useState("");
  // 根據選中的類別更新當前類別狀態
  const filterProducts = (category) => {
    setCurrentCategory(category);
  };
  // 路由變化時滾動到頁面頂部
  const ScrollToTop = () => {
    const { pathname } = useLocation(); //鉤子返回當前URL的資訊
    useEffect(() => {
      window.scrollTo(0, 0); // 當 pathname 改變時滾動到頁面頂部
    }, [pathname]);
    return null; // 不渲染任何內容
  };

  // 通過傳遞 cart 和 setCart 到 useCart 來使用它，並將 addToCart函數提出使用
  const { addToCart } = useCart(cart, setCart);
  // 購物車頁中更新購物車中商品數量
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            return null; // 數量為0時返回null，以便在下一步過濾掉
          }
        }
        return item;
      })
      .filter((item) => item !== null); // 過濾掉為null的商品
    setCart(updatedCart);
  };
  // 計算購物車中商品的總金額，reduce對陣列中的每個元素進行累積操作(acc累加器)
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="top">歡迎來到 貳拾飾!</div>
      <Nav
        filterProducts={filterProducts}
        itemCount={cart.length}
        memberName={memberName}
      />
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
        <Route
          path="/login"
          element={<Login setMemberName={setMemberName} />}
        />
        <Route path="/register" element={<Register />} />
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
            <OrderSummary
              orderInfo={orderInfo}
              totalAmount={totalAmount}
              memberName={memberName}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/member"
          element={<MemberPage memberName={memberName} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
