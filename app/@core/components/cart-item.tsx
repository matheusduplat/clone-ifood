import { CartContext, CartProduct } from "@/app/_context/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface Props {
  cartProduct: CartProduct;
}
export function CartItem({ cartProduct }: Props) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleQuantityDecreaseQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleQuantityIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveProductClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between ">
      {/* imagem item */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={cartProduct.name}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size={"icon"}
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleQuantityDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-3 text-sm">{cartProduct.quantity}</span>
            <Button
              size={"icon"}
              onClick={handleQuantityIncreaseQuantityClick}
              className="h-7 w-7"
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* botao deletar */}
      <Button
        size="icon"
        className="h-8 w-8 border border-solid border-muted-foreground"
        variant="ghost"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}
