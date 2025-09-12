export enum ProductStatus {
	DRAFT = "draft",
	ACTIVE = "active",
	INACTIVE = "inactive",
	OUT_OF_STOCK = "out_of_stock",
	DISCONTINUED = "discontinued",
}

export type Product = {
	id: number;
	name: string;
	description: string | null;
	slug: string;
	sku: string;
	price: number;
	compare_price: number | null;
	quantity: number;
	status: ProductStatus;
	category_id: number;
	main_image: string;
	gallery_images: string[] | null;
	meta_title: string | null;
	meta_description: string | null;
	tags: string[] | null;
	is_featured: boolean;
	created_at: string;
	updated_at: string;
};
