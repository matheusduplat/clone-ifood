import { Header } from "@/app/@core/components/header";
import { RestaurantItem } from "@/app/@core/components/restaurantItem";
import { db } from "@/app/@core/lib/prisma";

export default async function Recommended() {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="txt-lg mb-6 font-semibold">Restaurantes Recomendados</h2>
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
