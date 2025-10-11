import { useCategories } from "@/entities/categories";
import "./style.css";
import { Footer, HeroNavbars, SocialLinks } from "@/widgets";
import { FilterBar } from "@/widgets/shop/filter-bar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await useCategories();

  return (
    <main id="shop-page-container">
      <HeroNavbars isFixed />
      <FilterBar data={data} />
      {children}
      <SocialLinks />
      <Footer />
    </main>
  );
}
