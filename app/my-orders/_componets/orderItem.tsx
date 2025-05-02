"use client";
import { Avatar, AvatarImage } from "@/app/@core/components/ui/avatar";
import { Button } from "@/app/@core/components/ui/button";
import { Card, CardContent } from "@/app/@core/components/ui/card";
import { Separator } from "@/app/@core/components/ui/separator";
import { formatCurrency } from "@/app/@core/helpers/price";
import { CartContext } from "@/app/_context/cart";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface Props {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProduct: {
        include: { product: true };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return "Cancelado";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.DELIVERING:
      return "Em transporte";
    case OrderStatus.COMPLETED:
      return "Entregue";
    case OrderStatus.PREPARING:
      return "Preparando";
    default:
      return "Desconhecido";
  }
};

export function OrderItem({ order }: Props) {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.orderProduct) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
        emptyCart: false,
      });
    }

    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className=" p-5">
        <div
          className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground  ${order.status !== OrderStatus.COMPLETED && "bg-green-500 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>
          <Button
            className=" h-5 w-5 text-black"
            variant={"link"}
            size={"icon"}
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className=" space-y-2">
          {order.orderProduct.map((product) => (
            <div className="flex items-center gap-2" key={product.id}>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>
        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            className="text-xs text-primary"
            size={"sm"}
            disabled={order.status !== OrderStatus.COMPLETED}
            onClick={handleRedoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
