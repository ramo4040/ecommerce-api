import "./style.css";
import CustomAccordion from "@/components/custom-accordion";
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

          <CustomAccordion
            collapsible
            items={[
              {
                title: "Description",
                content: <p>{product.meta_description}</p>,
              },
              {
                title: "Specifications",
                content: "",
              },
              {
                title: "Shipping & Returns",
                content: (
                  <div className="shipping-accordion">
                    <h1>Shipping</h1>
                    <p>
                      We ship your furniture securely within 14 business days.
                      Delivery times vary by location, and tracking details are
                      provided upon dispatch. International orders may incur
                      customs fees.
                    </p>

                    <br />
                    <h1>Return Policy</h1>
                    <p>
                      Not satisfied? Return items in their original condition
                      within 30 days. For damaged or defective items, return
                      shipping is free. Refunds are issued after inspection.
                      Contact us for assistance!
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
