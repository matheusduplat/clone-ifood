import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../lib/utils";

interface Props {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantItem({ restaurant, className }: Props) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className={cn("min-w-[266px] max-w-[266px]", className)}
    >
      <div className="max-w-[266px]w-full min-w-[266px] space-y-3">
        <div className="relative h-[136px] w-full">
          <Image
            fill
            className="rounded-lg object-cover"
            src={restaurant.imageUrl}
            alt={restaurant.name}
          />
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px] ">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 "
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) == 0
                  ? "Entrega Grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
