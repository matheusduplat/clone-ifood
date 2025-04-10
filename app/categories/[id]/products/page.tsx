import { Header } from "@/app/@core/components/header";
import { ProductItem } from "@/app/@core/components/productItem";
import { db } from "@/app/@core/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}
export default async function CategoriesPage({ params: { id } }: Props) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
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

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="txt-lg mb-6 font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {category?.products.map((product) => (
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
