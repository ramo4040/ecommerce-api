"use client";

import "./style.css";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import {
  ItemFlipAnimation,
  ItemFlipWrapper,
} from "@/components/item-flip-animation";
import type { Category } from "@/entities/categories";
import { cn } from "@/lib/utils";

type Props = { data?: Category[] };

export const FilterBar: FC<Props> = async ({ data }) => {
  const pathname = usePathname();
  const currentCategory = data?.find(
    (category) => category.slug === pathname.split("/").pop(),
  );

  return (
    <section id="filter-bar">
      <div className="hero-section">
        <h1>{currentCategory ? currentCategory.name : "Shop"}</h1>
        <p>
          {currentCategory
            ? currentCategory.description
            : "Explore our Dark Collection, where deep hues and refined finishes bring an air of sophistication and drama to any room."}
        </p>
      </div>

      <div className="categories-section">
        <ItemFlipWrapper>
          <Link href="/shop" className="link">
            <ItemFlipAnimation text={<Home />} hoverText={<ArrowRight />} />
          </Link>
        </ItemFlipWrapper>

        {data?.map((category) => {
          return (
            <ItemFlipWrapper
              key={category.id}
              className="category-link-wrapper"
            >
              <Link
                className={cn("link category-link", {
                  active: currentCategory?.id === category.id,
                })}
                href={{ pathname: `/shop/category/${category.slug}` }}
              >
                {category.name}
                <ItemFlipAnimation text={<ArrowRight />} />
              </Link>
            </ItemFlipWrapper>
          );
        })}
      </div>
    </section>
  );
};
