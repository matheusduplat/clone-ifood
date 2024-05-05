import Image from "next/image";
import { CategoryList } from "./@core/components/cateroryList";
import { Header } from "./@core/components/header";
import { Search } from "./@core/components/search";
import { ProductList } from "./@core/components/productList";
import { Button } from "./@core/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          src="/banner-promo-0.png"
          alt="Até 30% de desconto"
          className="h-auto w-full object-contain"
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
        />
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
        <ProductList />
      </div>
    </>
  );
}
