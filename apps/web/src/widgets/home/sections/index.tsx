import Image from "next/image";
import "./style.css";
import Link from "next/link";
import type { FC } from "react";
import type { Category } from "@/entities/categories";

const CategoryDetails: FC<{ category: Category }> = ({
  category: { name, description, image_url, slug, meta_title },
}) => {
  return (
    <>
      <div className="image">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${image_url}`}
          alt={meta_title || name}
          fill
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={process.env.NEXT_PUBLIC_IMG_BASE64_PLACEHOLDER}
        />
      </div>

      <div className="details">
        <h3>{name}</h3>
        <p>{description}</p>
        <Link href={{ pathname: `/shop/${slug}` }}>Shop Now</Link>
      </div>
    </>
  );
};

export const HomeSections: FC<{ data?: Category[] }> = async ({ data }) => {
  if (!data) return null;

  const categories = data.slice(0, 3);

  return (
    <section id="home-sections">
      <div className="first-category">
        <CategoryDetails category={categories[0]} />
      </div>

      <div className="other-categories">
        <div className="second-category">
          <CategoryDetails category={categories[1]} />
        </div>
        <div className="third-category">
          <CategoryDetails category={categories[2]} />
        </div>
      </div>
    </section>
  );
};
