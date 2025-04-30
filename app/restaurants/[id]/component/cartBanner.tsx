"use client";

import { Cart } from "@/app/@core/components/cart";
import { Button } from "@/app/@core/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/@core/components/ui/sheet";
import { formatCurrency } from "@/app/@core/helpers/price";
import { CartContext } from "@/app/_context/cart";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface Props {
  restaurant: Pick<Restaurant, "id">;
}
export function CartBanner({ restaurant }: Props) {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50  w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              / {totalQuantity} {totalQuantity === 1 ? "item" : "itens"}
            </span>
          </h3>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button>Ver Sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
