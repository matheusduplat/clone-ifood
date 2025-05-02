"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/@core/helpers/price";
import { DiscountBadger } from "@/app/@core/components/discountBadge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/app/@core/components/ui/button";
import { useContext, useState } from "react";
import { ProductList } from "@/app/@core/components/productList";
import { DeliveryInfo } from "@/app/@core/components/deliveryInfo";
import { CartContext } from "@/app/_context/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/@core/components/ui/sheet";
import { Cart } from "@/app/@core/components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/@core/components/ui/alert-dialog";

interface Props {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementetaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export default function ProductInfo({
  product,
  complementetaryProducts,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some((productInCart) => {
      return productInCart.restaurantId !== product.restaurantId;
    });

    if (hasDifferentRestaurantProduct) {
      setIsConfirmationDialogOpen(true);
      return;
    }

    addToCart({ emptyCart: false });
  };

  const addToCart = ({ emptyCart }: { emptyCart: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(!isCartOpen);
  };

  const handleQuantityIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleQuantityDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) {
        return 1;
      }
      return currentState - 1;
    });

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        <div className="">
          <div className="flex items-center gap-[0.357rem] px-5">
            <div className="relative h-6 w-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </span>
          </div>
          <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">
            {product.name}
          </h1>
          <div className="flex justify-between px-5">
            <div className="">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {formatCurrency(calculateProductTotalPrice(product))}
                </h2>
                {product.discountPercentage > 0 && (
                  <DiscountBadger product={product} />
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-muted-foreground">
                  De: {formatCurrency(Number(product.price))}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 text-center">
              <Button
                size={"icon"}
                variant="ghost"
                className="border border-solid border-muted-foreground"
                onClick={handleQuantityDecreaseQuantityClick}
              >
                <ChevronLeftIcon />
              </Button>
              <span className="w-4">{quantity}</span>
              <Button
                size={"icon"}
                onClick={handleQuantityIncreaseQuantityClick}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 space-y-3 px-5">
          <h3 className="font-semibold ">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold">Sucos</h3>
          <ProductList products={complementetaryProducts} />
        </div>
        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja adicionar esse item ao carrinho mesmo assim? Isso irá
              limpar seu sacola atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancela</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
