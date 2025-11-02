import "./style.css";
import { getProductBySlug, indexProducts } from "@/entities/product";
import { ProductGallery } from "@/widgets/products/gallery";
import {
  ProductFeaturesMarquee,
  ProductInfoDetails,
} from "@/widgets/products/shop-product-details";

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
      <section className="product-container">
        <ProductGallery product={product} />

        <div className="product-info">
          <ProductInfoDetails product={product} />
          <ProductFeaturesMarquee />
        </div>
      </section>
    </main>
  );
}
