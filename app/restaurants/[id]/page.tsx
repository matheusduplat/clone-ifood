import { db } from "@/app/@core/lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantImage } from "./component/restaurantImage";
import RestaurantInfo from "./component/restaurantInfo";

interface Props {
  params: {
    id: string;
  };
}
export default async function RestaurantPage({ params: { id } }: Props) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <RestaurantInfo restaurant={restaurant} />
    </div>
  );
}
