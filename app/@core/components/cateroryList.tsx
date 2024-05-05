import { db } from "../lib/prisma";
import { CategoryItem } from "./categoryItem";

export async function CategoryList() {
  const categorias = await db.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-3">
      {categorias.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
}
