export * from "./types";

import type { Category } from "./types";

export const categoriesData: Category[] = [
	{
		id: 1,
		name: "Wood",
		slug: "wood",
		description: "Our Wood Collection celebrates the natural beauty of wood.",
		icon: null,
		image: "carousel-2.jpg",
		meta_title: null,
		meta_description: null,
		sort_order: 1,
		is_active: true,
		is_featured: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: 2,
		name: "Dark",
		slug: "dark",
		description:
			"Refined finishes bring an air of sophistication and drama to any room.",
		icon: null,
		image: "carousel-3.jpg",
		meta_title: null,
		meta_description: null,
		sort_order: 2,
		is_active: true,
		is_featured: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: 3,
		name: "Modern",
		slug: "modern",
		description:
			"The Modern Collection brings together graceful lines and luxurious finishes.",
		icon: null,
		image: "carousel-1.jpg",
		meta_title: null,
		meta_description: null,
		sort_order: 3,
		is_active: true,
		is_featured: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];
