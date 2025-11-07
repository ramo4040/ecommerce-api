import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchInfinityProducts } from "@/entities/product";
import { ShopProductsGrid } from "@/widgets/products/shop-products-grid";

export const revalidate = false;

export default async function Page() {
  const queryClient = await prefetchInfinityProducts({});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopProductsGrid />
    </HydrationBoundary>
  );
}
