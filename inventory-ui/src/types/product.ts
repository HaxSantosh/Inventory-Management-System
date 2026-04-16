import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  images: string[];
  categoryId: number;
  category?: Category; 
}