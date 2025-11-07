"use client";

import Image from "next/image";
import "./style.css";
import { type ComponentProps, useCallback, useRef, useState } from "react";
import type { Product } from "@/entities/product";
import { apiImgLoader, cn } from "@/lib/utils";
import { ImageObserver } from "./image-observer";

type Props = ComponentProps<"div"> & {
  product: Product;
};

export const ProductGallery = ({ product }: Props) => {
  const [currentImage, setCurrentImage] = useState<string>(product.main_image);
  const imageRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());

  const images = [product.main_image, ...(product.gallery_images || [])];

  const handleRegisterRef = useCallback(
    (imageSrc: string, element: HTMLDivElement) => {
      imageRefsMap.current.set(imageSrc, element);
    },
    [],
  );

  const handleImageClick = (imageSrc: string) => {
    const targetElement = imageRefsMap.current.get(imageSrc);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setCurrentImage(imageSrc);
    }
  };

  return (
    <div id="product-gallery">
      {images.map((imageSrc) => (
        <ImageObserver
          key={imageSrc}
          product={product}
          imageSrc={imageSrc}
          setCurrentImage={setCurrentImage}
          onRegisterRef={handleRegisterRef}
        />
      ))}

      <div className="img-selector-wrapper">
        <div className="img-selector">
          {images.map((imageSrc) => (
            <div
              key={imageSrc}
              className={cn(currentImage === imageSrc && "active")}
            >
              <Image
                src={imageSrc}
                loader={apiImgLoader}
                placeholder="blur"
                blurDataURL={process.env.NEXT_PUBLIC_IMG_BASE64_PLACEHOLDER}
                alt={product.meta_title ?? product.name}
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handleImageClick(imageSrc)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
