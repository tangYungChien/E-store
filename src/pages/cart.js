import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, updateQuantity, totalAmount }) => {
  // const totalAmount = cart.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  return (
    <div className="cart-container" style={{ minHeight: "100vh" }}>
      <div className="checkout-steps">
        <div className="step active">1. 購物車</div>
        <div className="step">2. 填寫資料</div>
        <div className="step">3. 訂單確認</div>
      </div>
      <h2>購物車</h2>
      {cart.length === 0 ? (
        <p>您的購物車是空的</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>商品</th>
                <th>款式</th>
                <th>單件價</th>
                <th>數量</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-details">
                      <div className="item-image">
                        <img src={item.images[0]} alt={item.name} />
                      </div>
                      <div className="item-name">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.color}</td>
                  <td>${item.price}</td>
                  {/* <td>{item.quantity}</td> */}
                  <td>
                    <QuantityControls
                      item={item}
                      updateQuantity={updateQuantity}
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            <h3>總金額: ${totalAmount}</h3>
            <Link to="/checkout">
              <button>前往結帳</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// QuantityControls 组件用於控制商品數量的增减
const QuantityControls = ({ item, updateQuantity }) => {
  const handleDecrease = () => {
    const newQuantity = Math.max(item.quantity - 1, 0);
    updateQuantity(item.id, newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = item.quantity + 1;
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="quantity-controls">
      <button onClick={handleDecrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default Cart;
