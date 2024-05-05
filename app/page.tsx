import Image from "next/image";
import { CategoryList } from "./@core/components/cateroryList";
import { Header } from "./@core/components/header";
import { Search } from "./@core/components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-3">
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
    </>
  );
}
