import { CategoryList } from "./@core/components/cateroryList";
import { Header } from "./@core/components/header";
import { Search } from "./@core/components/search";
import { ProductList } from "./@core/components/productList";
import { Button } from "./@core/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./@core/lib/prisma";
import { PromoBanner } from "./@core/components/promoBanner";
import { RestaurantList } from "./@core/components/restaurantList";
export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
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
      <div className="teste px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner src="/banner-promo-0.png" alt="Até 30% de desconto" />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/banner-promo-1.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>
      <div className="space-y-4 py-6 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
