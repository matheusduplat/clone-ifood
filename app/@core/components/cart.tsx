import { CartContext } from "@/app/_context/cart";
import { useContext } from "react";
import { CartItem } from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export function Cart() {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col py-5 ">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem cartProduct={product} key={product.id} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    SubTotal
                  </span>
                  <span className="text-xs">
                    {formatCurrency(subtotalPrice)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Entrega</span>
                  {Number(products?.[0]?.restaurant.deliveryFee) > 0 ? (
                    formatCurrency(
                      Number(products?.[0]?.restaurant.deliveryFee),
                    )
                  ) : (
                    <span className="uppercase text-primary">Grátis</span>
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Descontos
                  </span>
                  <span className="text-xs">
                    - {formatCurrency(totalDiscounts)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-6 w-full">Finalizar Pedido</Button>
        </>
      ) : (
        <h2 className="text-center font-semibold">Seu carrinho está vazio</h2>
      )}
    </div>
  );
}
