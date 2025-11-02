import { ProductGallery } from "@/widgets/products/gallery";
import "./style.css";
import { getProductBySlug, indexProducts } from "@/entities/product";

type Params = Promise<{ product: string }>;

export async function generateStaticParams() {
  const { data } = await indexProducts();
  return data?.map((product) => ({ product: product.slug })) ?? [];
}

export default async function Page({ params }: { params: Params }) {
  const { product: productSlug } = await params;
  const { data: product } = await getProductBySlug(productSlug);

  if (!product) return <div>Product not found</div>;

  return (
    <main id="product-page">
      <section className="product-details">
        <ProductGallery product={product} />

        <div className="info">details</div>
      </section>
    </main>
  );
}
