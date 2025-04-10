"use client";
import { DeliveryInfo } from "@/app/@core/components/deliveryInfo";
import { ProductList } from "@/app/@core/components/productList";
import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true;
                };
              };
            };
          };
        };
      };
      products: {
        take: 10;
        include: {
          restaurant: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>;
}

export default function RestaurantInfo({ restaurant }: Props) {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex items-center gap-[3px] rounded-full bg-foreground bg-primary px-2 py-[2px] text-white ">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => {
        return (
          <div key={category.id} className="mt-6 space-y-4">
            <h2 className="px-5 font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        );
      })}
    </div>
  );
}
