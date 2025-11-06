import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useCategories } from "@/entities/categories";
import { prefetchInfinityProducts } from "@/entities/product";
import { ShopProductsGrid } from "@/widgets/products/shop-products-grid";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { data } = await useCategories();

  return (
    data?.map((category) => ({
      id: category.slug,
    })) ?? []
  );
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const { data } = await useCategories();
  const category_id = data?.find((cat) => cat.slug === id)?.id;
  const queryClient = await prefetchInfinityProducts({
    category_id,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopProductsGrid categoryId={category_id} />
    </HydrationBoundary>
  );
}
