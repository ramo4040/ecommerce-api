import "./style.css";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { categoriesData } from "@/entities/categories";

export const Collections: FC<ComponentProps<"a">> = ({
	className,
	...props
}) => {
	return categoriesData.map((collection) => (
		<ItemFlipWrapper key={collection.name}>
			<Link
				className={className}
				{...props}
				id="collections-card"
				href={{ href: collection.slug }}
			>
				<div className="img-wrapper">
					<Image
						src={`/images/${collection.image}` || ""}
						alt={collection.meta_title || collection.name}
						fill
						style={{ objectFit: "cover" }}
					/>
				</div>

				<h4>{collection.name}</h4>

				<ItemFlipAnimation text={<ArrowRight size={14} />} className="icon" />
			</Link>
		</ItemFlipWrapper>
	));
};
