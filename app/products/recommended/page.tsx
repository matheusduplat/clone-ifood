import { Header } from "@/app/@core/components/header";
import { ProductItem } from "@/app/@core/components/productItem";
import { db } from "@/app/@core/lib/prisma";

export default async function Recommended() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="txt-lg mb-6 font-semibold">Produtos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
