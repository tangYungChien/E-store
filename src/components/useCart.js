//自訂義hook，將購物車的狀態和操作裝在一起，使它們可以在其他組件中使用
const useCart = (cart, setCart) => {
  const addToCart = (product, quantity, color) => {
    //函數形式的更新，prevCart當前的狀態值作為參數
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.color === color
      );
      //如果購物車已經有此商品，...item展開運算符(該對象包含item的所有屬性，但 quantity 屬性被更新)
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

  return { addToCart };
};

export default useCart;
