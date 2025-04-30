/* eslint-disable no-unused-vars */
"use client";
import { Prisma, Product } from "@prisma/client";
import { createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../@core/helpers/price";

type ProductWithRestaurant = Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        deliveryFee: true;
      };
    };
  };
}>;

interface AddProductToCartProps {
  product: ProductWithRestaurant;
  quantity: number;
  emptyCart: boolean;
}
export interface CartProduct extends ProductWithRestaurant {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantity: number;
  addProductToCart: ({
    emptyCart,
    product,
    quantity,
  }: AddProductToCartProps) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

interface Props {
  children: React.ReactNode;
}
export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant.deliveryFee)
    );
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products?.[0]?.restaurant.deliveryFee);

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          if (product.quantity === 1) {
            return product;
          }
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
    });
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== productId);
    });
  };

  const addProductToCart = ({
    emptyCart,
    product,
    quantity,
  }: AddProductToCartProps) => {
    if (emptyCart) {
      setProducts([]);
    }

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
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
