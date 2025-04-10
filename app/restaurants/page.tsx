"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import { Header } from "../@core/components/header";
import { RestaurantItem } from "../@core/components/restaurantItem";

export default function Restaurants() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!search) return;
      const restaurants = await searchForRestaurants(search);
      setRestaurants(restaurants);
    };
    fetchRestaurants();
  }, [search]);

  if (!search) return notFound();

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="txt-lg mb-6 font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6 ">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-[266px] max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
