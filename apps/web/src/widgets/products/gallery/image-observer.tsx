import Image from "next/image";
import { type ComponentProps, type FC, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { Product } from "@/entities/product";

type ImageObserverProps = ComponentProps<"div"> & {
  product: Product;
  imageSrc: string;
  setCurrentImage: (src: string) => void;
  onRegisterRef: (imageSrc: string, element: HTMLDivElement) => void;
};

export const ImageObserver: FC<ImageObserverProps> = ({
  product,
  imageSrc,
  setCurrentImage,
  onRegisterRef,
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      ref(node);
      if (node) {
        onRegisterRef(imageSrc, node);
      }
    },
    [ref, imageSrc, onRegisterRef],
  );

  useEffect(() => {
    if (inView) setCurrentImage(imageSrc);
  }, [inView, imageSrc, setCurrentImage]);

  return (
    <div className="image" ref={setRefs} {...rest}>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageSrc}`}
        alt={product.meta_title ?? product.name}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
