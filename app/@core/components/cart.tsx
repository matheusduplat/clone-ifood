"use client";
import { CartContext } from "@/app/_context/cart";
import { useContext, useState } from "react";
import { CartItem } from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "@/app/_action/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Cart({ setIsOpen }: CartProps) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { products, subtotalPrice, totalDiscounts, totalPrice, clearCart } =
    useContext(CartContext);
  const { toast } = useToast();
  const { data } = useSession();
  const router = useRouter();
  const handleFinishOrdeClick = async () => {
    if (!data?.user) {
      return;
    }

    const restaturant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaturant.deliveryFee,
        deliveryTimeMinutes: restaturant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaturant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        orderProduct: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();

      if (setIsOpen) {
        setIsOpen(false);
      }

      toast({
        title: "Pedido finalizado com sucesso",
        description: "Você pode acompanhá-lo na tela de seus pedidos",
        action: (
          <ToastAction
            altText="Meus Pedidos"
            onClick={() => {
              router.push("/my-orders");
            }}
          >
            Meus Pedidos
          </ToastAction>
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
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
                    <span className="text-xs text-muted-foreground">
                      Entrega
                    </span>
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
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar Pedido
            </Button>
          </>
        ) : (
          <h2 className="text-center font-semibold">Seu carrinho está vazio</h2>
        )}
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrdeClick}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
