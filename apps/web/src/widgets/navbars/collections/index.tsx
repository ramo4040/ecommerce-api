import "./style.css";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { useCategories } from "@/entities/categories";

export const Collections: FC<ComponentProps<"a">> = async ({
	className,
	...props
}) => {
	const { data } = await useCategories();

	return data?.map((collection) => (
		<ItemFlipWrapper key={collection.name}>
			<Link
				className={className}
				{...props}
				id="collections-card"
				href={{ href: collection.slug }}
			>
				<div className="img-wrapper">
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}${collection.image_url}`}
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
