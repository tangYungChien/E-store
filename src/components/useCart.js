import { useState } from "react";

const useCart = (cart, setCart) => {
  // const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, color) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.color === color
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: quantity,
            color: color,
          },
        ];
      }
    });
  };

  return { cart, addToCart };
};

export default useCart;
