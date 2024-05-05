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
    </>
  );
}
