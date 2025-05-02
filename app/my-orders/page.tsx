import { getServerSession } from "next-auth";
import { authOptions } from "../@core/lib/auth";
import { redirect } from "next/navigation";
import { db } from "../@core/lib/prisma";
import { Header } from "../@core/components/header";
import { OrderItem } from "./_componets/orderItem";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const order = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>
        <div className="space-y-3">
          {order.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
