import "./style.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CornerElement } from "@/components/corner-element";
import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Logo } from "@/widgets";
import { Collections } from "../collections";

export const abouts = [
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
	{ name: "FAQ", href: "/faq" },
];

export const HeroLeftNavbar = () => {
	return (
		<CornerElement position="top-left" size="xl" id="hero-left-navbar">
			<ul>
				<li>
					<Logo />
				</li>

				<li>
					<ItemFlipWrapper>
						<Link href={{ pathname: "/shop" }}>
							<ItemFlipAnimation text="Shop" />
						</Link>
					</ItemFlipWrapper>
				</li>

				<li>
					<HoverCard openDelay={100} closeDelay={100}>
						<HoverCardTrigger asChild>
							<ItemFlipWrapper hasIcon>
								<ItemFlipAnimation text="Collections" />
							</ItemFlipWrapper>
						</HoverCardTrigger>

						<HoverCardContent className="menu-card-content">
							<Collections />
						</HoverCardContent>
					</HoverCard>
				</li>

				<li>
					<HoverCard openDelay={100} closeDelay={100}>
						<HoverCardTrigger asChild>
							<ItemFlipWrapper hasIcon>
								<ItemFlipAnimation text="About" />
							</ItemFlipWrapper>
						</HoverCardTrigger>
						<HoverCardContent className="menu-card-content about">
							{abouts.map((about) => (
								<ItemFlipWrapper key={about.name}>
									<Link href={{ pathname: about.href }} className="item">
										<h4>{about.name}</h4>

										<ItemFlipAnimation
											text={<ArrowRight size={14} />}
											className="icon"
										/>
									</Link>
								</ItemFlipWrapper>
							))}
						</HoverCardContent>
					</HoverCard>
				</li>

				<li>
					<ItemFlipWrapper>
						<Link href={{ pathname: "/blog" }}>
							<ItemFlipAnimation text="Blog" />
						</Link>
					</ItemFlipWrapper>
				</li>

				<li>
					<ThemeToggle />
				</li>
			</ul>
		</CornerElement>
	);
};
