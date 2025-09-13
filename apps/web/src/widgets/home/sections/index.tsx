import Image from "next/image";
import "./style.css";
import Link from "next/link";
import { categoriesData } from "@/entities/categories";

export const HomeSections = () => {
	const firstCategory = categoriesData[0];
	const secondCategory = categoriesData[1];
	const thirdCategory = categoriesData[2];

	return (
		<section id="home-sections">
			<div className="first-category">
				<Image
					src={`/images/${firstCategory.image}`}
					alt={firstCategory.meta_title || firstCategory.name}
					fill
					style={{ objectFit: "cover" }}
				/>

				<div className="details">
					<h3>{firstCategory.name}</h3>
					<p>{firstCategory.description}</p>
					<Link href={{ href: `/categories/${firstCategory.slug}` }}>
						Shop Now
					</Link>
				</div>
			</div>

			<div className="other-categories">
				<div className="second-category">
					<div className="image">
						<Image
							src={`/images/${secondCategory.image}`}
							alt={secondCategory.meta_title || secondCategory.name}
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>

					<div className="details">
						<h3>{secondCategory.name}</h3>
						<p>{secondCategory.description}</p>
						<Link href={{ href: `/categories/${secondCategory.slug}` }}>
							Shop Now
						</Link>
					</div>
				</div>

				<div className="third-category">
					<div className="image">
						<Image
							src={`/images/${thirdCategory.image}`}
							alt={thirdCategory.meta_title || thirdCategory.name}
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>

					<div className="details">
						<h3>{thirdCategory.name}</h3>
						<p>{thirdCategory.description}</p>
						<Link href={{ href: `/categories/${thirdCategory.slug}` }}>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
