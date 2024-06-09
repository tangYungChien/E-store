import React from "react";
import { useParams } from "react-router-dom";
import products from "../components/Allproducts";
import { useState } from "react";
import useCart from "../components/useCart";

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id == productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleAddToCart = () => {
    // 處理加入購物車的邏輯
    addToCart(product, quantity, selectedColor);
    alert(`已將${quantity}個${selectedColor} ${product.name} 加入購物車`);
  };

  const handleBuyNow = () => {
    // 處理立即購買的邏輯
    alert(`立即購買 ${product.name}`);
  };
  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-images">
        <button className="prev-button" onClick={handlePrevImage}>
          &lt;
        </button>
        <img
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className="product-image"
        />
        <button className="next-button" onClick={handleNextImage}>
          &gt;
        </button>
      </div>
      <h2> $ {product.price}</h2>

      {product.colors && (
        <div className="product-colors">
          <h3>款式:</h3>
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`color-button ${
                selectedColor == color ? "selected" : ""
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      )}

      <div className="quantity-selector">
        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button className="add-to-cart" onClick={handleAddToCart}>
        加入購物車
      </button>
      {/* <button className="buy-now" onClick={handleBuyNow}>
        立即購買
      </button> */}
    </div>
  );
};

export default ProductDetail;
