import { CartContext } from "@/app/_context/card";
import { useContext } from "react";
import { CartItem } from "./cart-item";

export function Cart() {
  const { products } = useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
