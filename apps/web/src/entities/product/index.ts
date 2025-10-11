import { type Product, ProductStatus } from "./types";

export * from "./types";

export const ProductsData: Product[] = [
  {
    id: 1,
    name: "khechba",
    description:
      "Experience ultimate comfort with our premium ergonomic office chair. Featuring adjustable lumbar support, breathable mesh fabric, and a sleek contemporary design. Perfect for long work sessions with 360-degree swivel and smooth-rolling casters. Built with high-quality materials for durability and style.",
    slug: "/products/modern-ergonomic-office-chair",
    sku: "CHAIR-ERG-001",
    price: 299.99,
    compare_price: 399.99,
    quantity: 25,
    status: ProductStatus.ACTIVE,
    category_id: 1,
    main_image: "/images/p1-1.jpg",
    gallery_images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
    ],
    meta_title: "Modern Ergonomic Office Chair - Premium Comfort & Support",
    meta_description:
      "Shop our modern ergonomic office chair with adjustable lumbar support, breathable mesh, and contemporary design. Free shipping on orders over $200.",
    tags: [
      "office chair",
      "ergonomic",
      "modern",
      "adjustable",
      "mesh",
      "comfort",
    ],
    is_featured: true,
    created_at: "2025-09-10T10:00:00Z",
    updated_at: "2025-09-12T15:30:00Z",
  },
];
