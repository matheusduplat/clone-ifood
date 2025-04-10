"use server";

import { db } from "@/app/@core/lib/prisma";

export const searchForRestaurants = async (search: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  return restaurants;
};
