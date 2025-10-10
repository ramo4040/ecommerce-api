"use client";

import { ArrowRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ProductsData } from "@/entities/product";

const pageLinks = [
	{ name: "Shop", href: "#" },
	{ name: "About", href: "/about" },
	{ name: "Blog", href: "#" },
];

export const HeroRightNavbarClient: FC<ComponentProps<"div">> = ({
	children,
}) => {
	const product = ProductsData[0];

	const [cartOpen, setCartOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
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
				<SheetTrigger asChild>
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
										src={product.main_image}
										alt={product.meta_title || "Product Image"}
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>

								<div className="details">
									<div className="info">
										<p className="name">{product.name}</p>

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

			<menu id="menu-container">
				<Sheet open={menuOpen} onOpenChange={setMenuOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="menu-btn">
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent id="menu-sheet">
						<div>
							<Button
								variant="ghost"
								onClick={() => setMenuOpen(false)}
								className="close-btn"
							>
								<SheetTitle>Close</SheetTitle>
							</Button>
							<div className="items-link-container">
								{children}
								{pageLinks.map((e) => {
									return (
										<Link
											key={e.name}
											href={{ pathname: e.href }}
											className="item-link"
										>
											{e.name}
											<ArrowRight />
										</Link>
									);
								})}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</menu>
		</>
	);
};
