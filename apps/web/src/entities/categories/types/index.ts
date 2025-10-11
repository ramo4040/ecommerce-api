export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string | null;
  image_url?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  sort_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}
