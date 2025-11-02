import { useCategories } from "@/entities/categories";
import "../style.css";
import { FilterBar } from "@/widgets/shop/filter-bar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await useCategories();

  return (
    <>
      <FilterBar data={data} />
      {children}
    </>
  );
}
