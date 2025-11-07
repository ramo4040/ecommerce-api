import "./style.css";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useShoppingCartStore } from "@/entities/product";
import { apiImgLoader } from "@/lib/utils";

export const ShoppingCartNavbar = () => {
  const { items, totalPrice, incDec, removeItem } = useShoppingCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" id="shopping-cart-btn">
          <ShoppingCart strokeWidth={1.5} />
          <p>({items.length})</p>
        </Button>
      </SheetTrigger>
      <SheetContent id="shopping-cart-sheet">
        <SheetHeader>
          <SheetTitle>
            Cart ({items.length})
            <Button
              variant="ghost"
              size="icon"
              className="close-btn"
              onClick={() => setCartOpen(false)}
            >
              <X strokeWidth={1.5} />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="cart-details">
          <div className="cart-items">
            {items.map(({ item, qty }) => {
              return (
                <div key={item.id} className="item">
                  <div className="img">
                    <Image
                      src={item.main_image}
                      loader={apiImgLoader}
                      alt={item.meta_title ?? item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
                      blurDataURL={
                        process.env.NEXT_PUBLIC_IMG_BASE64_PLACEHOLDER
                      }
                    />
                  </div>

                  <div className="details">
                    <div className="info">
                      <p className="name">{item.name}</p>

                      <p className="quantity-price">
                        <span className="price">{item.price}$</span>
                        <span className="compare_price">
                          {item.compare_price}$
                        </span>
                      </p>
                    </div>

                    <div className="actions">
                      <div className="quantity-selector">
                        <Button
                          size="icon"
                          type="button"
                          disabled={qty <= 1}
                          onClick={() => incDec(item.id, -1)}
                        >
                          -
                        </Button>
                        <span>{qty}</span>
                        <Button
                          size="icon"
                          type="button"
                          disabled={qty >= item.quantity}
                          onClick={() => incDec(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <X strokeWidth={1.5} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="checkout">
            <div className="total">
              <p>${totalPrice()}</p>
              <p>Subtotal</p>
            </div>
            <Button size={"lg"}>Checkout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
