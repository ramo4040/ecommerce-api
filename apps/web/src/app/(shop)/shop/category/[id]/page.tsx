import { useCategories } from "@/entities/categories";
import { ShopProductsGrid } from "@/widgets/products/shop-products-grid";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { data } = await useCategories();

  return data?.map((category) => ({
    id: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  return <ShopProductsGrid />;
}
