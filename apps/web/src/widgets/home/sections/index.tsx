import Image from "next/image";
import "./style.css";
import Link from "next/link";
import { useCategories } from "@/entities/categories";

export const HomeSections = async () => {
  const { data } = await useCategories();

  if (!data) return null;

  const firstCategory = data[0];
  const secondCategory = data[1];
  const thirdCategory = data[2];

  return (
    <section id="home-sections">
      <div className="first-category">
        <div className="image">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${firstCategory.image_url}`}
            alt={firstCategory.meta_title || firstCategory.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

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
              src={`${process.env.NEXT_PUBLIC_API_URL}${secondCategory.image_url}`}
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
              src={`${process.env.NEXT_PUBLIC_API_URL}${thirdCategory.image_url}`}
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
