"use server";

import { Prisma } from "@prisma/client";
import { db } from "../@core/lib/prisma";
import { revalidatePath } from "next/cache";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  const order = await db.order.create({
    data,
  });
  revalidatePath("/my-orders");
  return order;
};
