"use client";
import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  // eslint-disable-next-line no-unused-vars
  addProductToCart: (product: Product, quantity: number) => void;
}

interface Props {
  children: React.ReactNode;
}
export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Product, quantity: number) => {
    const isProductAlreadyInCart = products.some(
      (item) => item.id === product.id,
    );

    if (isProductAlreadyInCart) {
      return setProducts((prevProducts) => {
        return prevProducts.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      });
    }

    setProducts((prevProducts) => [...prevProducts, { ...product, quantity }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
