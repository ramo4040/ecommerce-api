"use client";

import "./style.css";
import { Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
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
	const [cartOpen, setCartOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<div id="hero-right-navbar">
			<Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
				<Search strokeWidth={1.5} />
			</Button>

			<CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Products">
							<CommandItem>Kapp</CommandItem>
							<CommandItem>Skala</CommandItem>
							<CommandItem>Fjord</CommandItem>
							<CommandItem>Sona</CommandItem>
							<CommandItem>Alba</CommandItem>
							<CommandItem>Lykke</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>

			<Sheet open={cartOpen} onOpenChange={setCartOpen}>
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
								onClick={() => setCartOpen(false)}
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
