import { db } from "@/app/@core/lib/prisma";
import { notFound } from "next/navigation";

import ProductInfo from "./component/productInfo";
import { ProductImage } from "./component/productImage";

interface ProductPageProps {
  params: {
    id: string;
  };
}
export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const complementetaryProducts = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />
      <ProductInfo
        product={product}
        complementetaryProducts={complementetaryProducts}
      />
    </div>
  );
}
