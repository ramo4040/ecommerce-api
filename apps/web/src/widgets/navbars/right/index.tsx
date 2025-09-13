"use client";

import "./style.css";
import { Search, ShoppingCart, X } from "lucide-react";
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
import { ProductsData } from "@/entities/product";

export const HeroRightNavbar = () => {
	const p = ProductsData[0];
	const [open, setOpen] = useState(false);

	return (
		<div id="hero-right-navbar">
			<Button variant="ghost" size="icon">
				<Search strokeWidth={1.5} />
			</Button>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Button variant="ghost" size="icon" className="shopping-cart-btn">
						<ShoppingCart strokeWidth={1.5} />
						<p>(0)</p>
					</Button>
				</SheetTrigger>
				<SheetContent id="shopping-cart-sheet">
					<SheetHeader>
						<SheetTitle>
							Cart (0)
							<Button
								variant="ghost"
								size="icon"
								className="close-btn"
								onClick={() => setOpen(false)}
							>
								<X strokeWidth={1.5} />
							</Button>
						</SheetTitle>
					</SheetHeader>

					<div className="cart-details">
						<div className="cart-items">
							<div className="item">
								<div className="img">
									<Image
										src={p.main_image}
										alt={p.meta_title || "Product Image"}
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>

								<div className="details">
									<div className="info">
										<p className="name">{p.name}</p>

										<p className="quantity-price">
											<span className="price">255$</span>
											<span className="compare_price">300$</span>
										</p>
									</div>

									<div className="actions">
										<div className="quantity-selector">
											<Button size="icon" type="button">
												-
											</Button>
											<span>4</span>
											<Button size="icon" type="button">
												+
											</Button>
										</div>

										<Button variant="ghost" size="icon" className="remove-btn">
											<X strokeWidth={1.5} />
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className="checkout">
							<div className="total">
								<p>$255</p>
								<p>Subtotal</p>
							</div>
							<Button size={"lg"}>Checkout</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
