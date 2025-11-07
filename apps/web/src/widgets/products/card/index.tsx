import "./style.css";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/entities/product";
import { apiImgLoader, calculateDiscount, cn } from "@/lib/utils";

type Props = ComponentProps<"a"> & {
  product: Product;
};

export const ProductCard: FC<Props> = ({
  product,
  className,
  ...props
}: Props) => {
  return (
    <Link
      className={cn("product-card", className)}
      {...props}
      href={{ pathname: `/shop/${product.slug}` }}
    >
      <Image
        src={product.main_image}
        loader={apiImgLoader}
        alt={product.meta_title ?? product.name}
        fill
        style={{ objectFit: "cover" }}
        placeholder="blur"
        blurDataURL={process.env.NEXT_PUBLIC_IMG_BASE64_PLACEHOLDER}
      />

      <div className="title">
        {product.name}
        <ArrowRight />
      </div>

      <div className="discount">
        <p>{calculateDiscount(product.price, product.compare_price)}% OFF</p>
      </div>

      <div className="container">
        <div className="details">
          <div className="prices">
            <span>${product.price.toFixed(2)}</span>
            <span>${product.compare_price?.toFixed(2)}</span>
          </div>

          <Button variant="link" className="view-product">
            View
          </Button>
        </div>
      </div>
    </Link>
  );
};
