"use client";

import { Button } from "@/components/ui/button";
import "./style.css";
import { Minus, Plus } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/entities/product";
import { calculateDiscount } from "@/lib/utils";

type Props = ComponentProps<"div"> & { product: Product };

export const ProductInfoDetails = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div id="product-info-details">
      <div className="pricing">
        <span className="price-label">
          <p>${product.price}</p>
          <p>${product.compare_price}</p>
        </span>

        <Badge variant="default" className="discount-badge">
          {calculateDiscount(product.price, product.compare_price)}% OFF
        </Badge>
      </div>

      <div className="description-container">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <small className="qty">
          <span className="dot" />
          {product.quantity} in stock
        </small>
      </div>

      <div className="add-to-cart-section">
        <div className="qty-selector">
          <Button
            size="lg"
            disabled={quantity <= 1}
            onClick={() => setQuantity((prev) => prev - 1)}
            className="qty-btn"
          >
            <Minus />
          </Button>
          <span>{quantity}</span>
          <Button
            size="lg"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="qty-btn"
            disabled={quantity >= product.quantity}
          >
            <Plus />
          </Button>
        </div>

        <Button className="submit" size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
